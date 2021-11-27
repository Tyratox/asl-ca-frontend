import React, { FunctionComponent, useContext, useState } from "react";

import { AppContext } from "./AppWrapper";
import { Certificate, Mutation } from "../schema";
import {
  GENERATE_CERTIFICATE,
  REVOKE_CERTIFICATE,
} from "../graphql/certificates";
import { GET_CURRENT_USER } from "../graphql/user";
import { Maybe } from "../utilities/types";
import Box from "../components/Box";
import Modal from "./Modal";
import Spinner from "./Spinner";
import request from "../utilities/request";
import useSWR, { mutate } from "swr";

const UserCertificates: FunctionComponent<{
  token: Maybe<string>;
  hasChanges: boolean;
}> = ({ token, hasChanges }) => {
  const { user } = useContext(AppContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [lastCertificateP12, setLastCertificateP12] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);
  const [error, setError] = useState<Maybe<string>>(null);

  //maybe display the just generated certificate
  const [lastCertificate, setLastCertificate] =
    useState<Maybe<Certificate>>(null);

  const handleCloseModal = (download: boolean) => {
    setShowModal(false);
    if (download) {
      //download private key
      const a = document.createElement("a");
      a.href = "data:application/octet-stream;base64," + lastCertificateP12;
      a.download = `${name}.p12`; //TODO: change extension
      a.click(); //Downloaded file
    }
    setName("");
    setPassword("");
    setLastCertificateP12("");
    mutate(GET_CURRENT_USER);
  };

  const generateCertificate = (
    //@ts-ignore
    e: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hasChanges || generatingCertificate) {
      return;
    }

    setGeneratingCertificate(true);

    return request(GENERATE_CERTIFICATE, { name, password })
      .then(
        (result: { generateCertificate: Mutation["generateCertificate"] }) => {
          setLastCertificate(result.generateCertificate.certificate);

          //encode in base64, if actualy certificate is downloaded
          //this will probably be already be the case
          //TODO: remove
          const file = result.generateCertificate.p12;
          setLastCertificateP12(file);
          setShowModal(true);
          setGeneratingCertificate(false);
        }
      )
      .catch((e) => {
        if (e.message && e.message.includes("ThrottlerException")) {
          setError("Please wait a minute and then try again.");
          setGeneratingCertificate(false);
        } else {
          setError(e.message);
          setGeneratingCertificate(false);
        }
      });
  };
  const revoke =
    (id: string) =>
    (
      //@ts-ignore
      e: MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      return request(REVOKE_CERTIFICATE, {
        id,
      }).then(
        (result: { revokeCertificate: Mutation["revokeCertificate"] }) => {
          if ("success" in result.revokeCertificate) {
            mutate(GET_CURRENT_USER);
          } else {
            //TODO: display error
          }
        }
      );
    };

  return (
    <div className="flex wrap">
      <Box width="half-on-large" paddingRight>
        <h1>Issue a new certificate</h1>
        <p>
          Before you issue a new certificate, please check the user information
          above and save the changes if necessary.
        </p>
        <label className="label">Certificate Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="label">Certificate Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small className="note">
          Note: You can only generate up to five certificates per minute.
        </small>
        <button
          className="button vertical-center"
          disabled={hasChanges || name.length === 0 || generatingCertificate}
          onClick={generateCertificate}
        >
          Generate certificate
          {generatingCertificate && <Spinner />}
        </button>
        {error && <div>{error}</div>}

        {showModal && (
          <Modal>
            <div className="modalContainer">
              <div className="modalContent">
                <header className="modal_header">
                  <h2 className="modal_header-title">
                    {" "}
                    Download Certificate {name}
                  </h2>
                </header>
                <main className="modal_content">
                  Do you want to download the newly created certificate in a
                  PKCS#12 format?
                </main>
                <footer className="modal_footer">
                  <button
                    className="secondary-button margin-right"
                    onClick={() => handleCloseModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="button"
                    onClick={() => handleCloseModal(true)}
                  >
                    Download
                  </button>
                </footer>
              </div>
            </div>
          </Modal>
        )}
      </Box>
      <Box width="half-on-large" paddingLeft>
        <h1>List of issued certificates</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Issued at</th>
              <th>Revoke(-d)</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.certificates.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td>
                    {c.is_revoked ? (
                      "Revoked"
                    ) : (
                      <button className="danger-button" onClick={revoke(c.id)}>
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
};

export default UserCertificates;
