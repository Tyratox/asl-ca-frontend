import { authenticate, generateToken } from "../../utilities/mock-api";
import type { NextApiRequest, NextApiResponse } from "next";

import { ErrorResponse, User } from "../../utilities/types";

export type LoginResponse = { token: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    try {
      const request = JSON.parse(req.body);

      if (request.username && request.password) {
        const user = authenticate(request.username, request.password);

        if (user) {
          res.status(200).json({ token: generateToken(user) });
        } else {
          res
            .status(400)
            .json({ error: "Invalid username/password combination" });
        }
      } else {
        res
          .status(400)
          .json({ error: "Username and password must be provided" });
      }
    } catch (e) {
      res.status(400).json({ error: "Error while decoding JSON" });
    }
  } else {
    res.status(400).json({ error: "Error: use POST for /login" });
  }
}
