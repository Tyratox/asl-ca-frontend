import {
  generateNewCertificate,
  getCertificatesByUser,
  getUserByToken,
} from "../../../utilities/mock-api";
import type { NextApiRequest, NextApiResponse } from "next";

import { Certificate, ErrorResponse, User } from "../../../utilities/types";

export type CertificatesResponse = { certificates: Certificate[] };
export type CertificateResponse = { certificate: Certificate };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CertificatesResponse | CertificateResponse | ErrorResponse
  >
) {
  if (req.method === "POST") {
    try {
      const request = JSON.parse(req.body);

      if (request.token) {
        const user = getUserByToken(request.token);

        if (user) {
          if (request.name) {
            //Create new cert
            const certificate = generateNewCertificate(user, request.name);

            res.status(200).json({ certificate });
          } else {
            //list certs
            res.status(200).json({ certificates: getCertificatesByUser(user) });
          }
        } else {
          res.status(400).json({ error: "Invalid token" });
        }
      } else {
        res.status(400).json({ error: "Token must be provided" });
      }
    } catch (e) {
      res.status(400).json({ error: "Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const request = JSON.parse(req.body);

      if (request.token && request.id) {
        const user = getUserByToken(request.token);

        if (user) {
          const certificates = getCertificatesByUser(user);
          const cert = certificates.find((c) => c.id === request.id);

          if (cert) {
            cert.revoked = true;
            //list certs
            res.status(200).json({ certificates });
          } else {
            res.status(400).json({ error: "Invalid certificate id" });
          }
        } else {
          res.status(400).json({ error: "Invalid token" });
        }
      } else {
        res
          .status(400)
          .json({ error: "Token and certificate id must be provided" });
      }
    } catch (e) {
      res.status(400).json({ error: "Error" });
    }
  } else {
    res
      .status(400)
      .json({ error: "Error: use POST or DELETE for /certificates" });
  }
}
