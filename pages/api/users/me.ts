import { getUserByToken } from "../../../utilities/mock-api";
import type { NextApiRequest, NextApiResponse } from "next";

import { ErrorResponse, User } from "../../../utilities/types";

export type MeResponse = { me: User };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MeResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    try {
      const request = JSON.parse(req.body);

      if (request.token) {
        const user = getUserByToken(request.token);

        if (user) {
          const copy: User & { password?: string } = { ...user };
          delete copy.password;

          res.status(200).json({ me: copy });
        } else {
          res.status(400).json({ error: "Invalid token" });
        }
      } else {
        res.status(400).json({ error: "Token must be provided" });
      }
    } catch (e) {
      res.status(400).json({ error: "Error" });
    }
  } else if (req.method === "PUT") {
    try {
      const request = JSON.parse(req.body);

      if (
        (request.password || request.password === null) &&
        request.firstname &&
        request.lastname &&
        request.email &&
        request.token
      ) {
        const user = getUserByToken(request.token);

        if (user) {
          if (request.password !== null && request.password !== "") {
            user.password = request.password;
          }

          user.firstname = request.firstname;
          user.lastname = request.lastname;
          user.email = request.email;

          res.status(200).json({ me: user });
        } else {
          res
            .status(400)
            .json({ error: "Invalid username/password combination" });
        }
      } else {
        res.status(400).json({ error: "All fields must be provided" });
      }
    } catch (e) {
      res.status(400).json({ error: "Error while decoding JSON" });
    }
  } else {
    res.status(400).json({ error: "Error: use POST or PUT for /me" });
  }
}
