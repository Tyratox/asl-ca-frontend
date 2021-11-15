import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AppContext } from "./AppWrapper";
import { Certificate, Mutation } from "../schema";
import {
  GENERATE_CERTIFICATE,
  REVOKE_CERTIFICATE,
} from "../graphql/certificates";
import { GET_CURRENT_USER } from "../graphql/user";
import { Maybe } from "../utilities/types";
import Box from "../components/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import request from "../utilities/request";
import useSWR, { mutate } from "swr";

const UserCertificates: FunctionComponent<{
  token: Maybe<string>;
  hasChanges: boolean;
}> = ({ token, hasChanges }) => {
  const { user } = useContext(AppContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newCertificate, setNewCertificate] = useState("");
  const [downloadOpen, setDownloadOpen] = React.useState(false);

  const handleDownloadClose = (download: boolean) => {
    setDownloadOpen(false);
    if (download) {
      //download private key
      const a = document.createElement("a");
      a.href = "data:application/octet-stream;base64," + newCertificate;
      a.download = `${name}.p12`; //TODO: change extension
      a.click(); //Downloaded file
    }
    setName("");
    setPassword("");
    setNewCertificate("");
    mutate(GET_CURRENT_USER);
  };

  //maybe display the just generated certificate
  const [lastCertificate, setLastCertificate] =
    useState<Maybe<Certificate>>(null);

  const generateCertificate = (
    //@ts-ignore
    e: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hasChanges) {
      return;
    }

    return request(GENERATE_CERTIFICATE, { name, password }).then(
      (result: { generateCertificate: Mutation["generateCertificate"] }) => {
        setLastCertificate(result.generateCertificate.certificate);

        //encode in base64, if actualy certificate is downloaded
        //this will probably be already be the case
        //TODO: remove
        const file = result.generateCertificate.p12;
        setNewCertificate(file);
        setDownloadOpen(true);
      }
    );
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
        <button
          className="button"
          disabled={hasChanges || name.length === 0}
          onClick={generateCertificate}
        >
          Generate certificate
        </button>
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
      <Dialog
        open={downloadOpen}
        onClose={handleDownloadClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Download " + name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to download the newly created certificate in a PKCS#12
            format?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="secondary-button"
            onClick={() => handleDownloadClose(false)}
          >
            Cancel
          </button>
          <button className="button" onClick={() => handleDownloadClose(true)}>
            Download
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserCertificates;
