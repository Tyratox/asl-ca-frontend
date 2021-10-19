import {
  getCurrentSerialNumber,
  getNumberOfIssuedCertificates,
  getNumberOfRevokesCertificates,
  getUserByToken,
} from "../../../utilities/mock-api";
import type { NextApiRequest, NextApiResponse } from "next";

import { ErrorResponse } from "../../../utilities/types";

export type SystemResponse = {
  serial: number;
  numberOfIssuedCertificates: number;
  numberOfRevokedCertificates: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SystemResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    try {
      const request = JSON.parse(req.body);

      if (request.token) {
        const user = getUserByToken(request.token);

        if (user) {
          if (user.isAdministrator) {
            res.status(200).json({
              serial: getCurrentSerialNumber(),
              numberOfIssuedCertificates: getNumberOfIssuedCertificates(),
              numberOfRevokedCertificates: getNumberOfRevokesCertificates(),
            });
          } else {
            res.status(400).json({ error: "Unsufficient permissions" });
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
  } else {
    res.status(400).json({ error: "Error: use POST for /system" });
  }
}
