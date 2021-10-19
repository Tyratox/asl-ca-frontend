import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import { Certificate, ErrorResponse, Maybe, User } from "../utilities/types";
import { CertificateResponse } from "../pages/api/certificates";
import Box from "../components/Box";
import Button from "../components/form/Button";
import Flex from "../components/Flex";
import Input from "./form/Input";
import Label from "./form/Label";
import Table from "./Table";
import useSWR, { mutate } from "swr";

const UserCertificates: FunctionComponent<{
  token: Maybe<string>;
  hasChanges: boolean;
}> = ({ token, hasChanges }) => {
  const [name, setName] = useState("");

  //maybe display the just generated certificate
  const [lastCertificate, setLastCertificate] =
    useState<Maybe<Certificate>>(null);

  const { data, error } = useSWR<
    | {
        certificates: Certificate[];
      }
    | ErrorResponse
  >(token ? ["/api/certificates", token] : null, (query) =>
    fetch(query, { method: "POST", body: JSON.stringify({ token }) }).then(
      (r) => r.json()
    )
  );

  const generateCertificate = (
    e: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hasChanges) {
      return;
    }

    return fetch("/api/certificates", {
      method: "POST",
      body: JSON.stringify({ token, name }),
    })
      .then((r) => r.json())
      .then((r: ErrorResponse | CertificateResponse) => {
        if ("certificate" in r) {
          setLastCertificate(r.certificate);

          //encode in base64, if actualy certificate is downloaded
          //this will probably be already be the case
          //TODO: remove
          const file = btoa(r.certificate.blob);

          //download certificate
          const a = document.createElement("a");
          a.href = "data:application/octet-stream;base64," + file;
          a.download = `${r.certificate.name}.txt`; //TODO: change extension
          a.click(); //Downloaded file
        }

        if (data && "certificates" in data && "certificate" in r) {
          setName("");

          mutate(["/api/certificates", token], {
            certificates: [...data.certificates, r.certificate],
          });
        }
      });
  };
  const revoke =
    (id: number) => (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      return fetch("/api/certificates", {
        method: "DELETE",
        body: JSON.stringify({ token, id }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (data && "certificates" in data && "certificates" in r) {
            mutate(["/api/certificates", token], {
              certificates: r.certificates,
            });
          }
        });
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
            {data && "certificates" in data ? (
              data.certificates.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    {c.revoked ? (
                      "Revoked"
                    ) : (
                      <Button onClick={revoke(c.id)}>Revoke</Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Error</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default UserCertificates;
