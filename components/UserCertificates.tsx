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
import Button from "../components/form/Button";
import Flex from "../components/Flex";
import Input from "./form/Input";
import Label from "./form/Label";
import Table from "./Table";
import request from "../utilities/request";
import useSWR, { mutate } from "swr";

const downloadCertificate = (certificate: Certificate) => {
  //download private key
  const a = document.createElement("a");
  a.href =
    "data:application/octet-stream;base64," + certificate.certificateFile;
  a.download = `${certificate.name}.pem`;
  a.click(); //Downloaded file
};

const UserCertificates: FunctionComponent<{
  token: Maybe<string>;
  hasChanges: boolean;
}> = ({ token, hasChanges }) => {
  const { user } = useContext(AppContext);
  const [name, setName] = useState("");

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

    return request(GENERATE_CERTIFICATE, { name }).then(
      (result: { generateCertificate: Mutation["generateCertificate"] }) => {
        setLastCertificate(result.generateCertificate.certificate);

        //encode in base64, if actualy certificate is downloaded
        //this will probably be already be the case
        //TODO: remove
        const file = result.generateCertificate.privateKey;

        //download private key
        const a = document.createElement("a");
        a.href = "data:application/octet-stream;base64," + file;
        a.download = `${result.generateCertificate.certificate.name}.key`; //TODO: change extension
        a.click(); //Downloaded file

        setName("");
        mutate(GET_CURRENT_USER);
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
    <Flex>
      <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginRight={0.5}>
        <h1>Issue a new certificate</h1>
        <p>
          Before you issue a new certificate, please check the user information
          above and save the changes if necessary.
        </p>
        <Label>Certificate Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          disabled={hasChanges || name.length === 0}
          onClick={generateCertificate}
        >
          Generate certificate
        </Button>
      </Box>
      <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginLeft={0.5}>
        <h1>List of issued certificates</h1>
        <Table>
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
                  <td>
                    <a href="#" onClick={() => downloadCertificate(c)}>
                      {c.name}
                    </a>
                  </td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td>
                    {c.is_revoked ? (
                      "Revoked"
                    ) : (
                      <Button onClick={revoke(c.id)}>Revoke</Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default UserCertificates;
