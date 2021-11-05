import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import { GET_CURRENT_USER, UPDATE_ME, UPDATE_PASSWORD } from "../graphql/user";
import { Maybe } from "../utilities/types";
import { Mutation, User } from "../schema";
import { mutate } from "swr";
import Box from "../components/Box";
import request from "../utilities/request";

const UserInformation: FunctionComponent<{
  user: Maybe<User>;
  token: Maybe<string>;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
}> = ({ user, token, hasChanges, setHasChanges }) => {
  const [password, setPassword] = useState<Maybe<string>>(null);
  const [oldPassword, setOldPassword] = useState<Maybe<string>>(null);

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    const c =
      (password !== null && password !== "") ||
      firstname !== user?.firstname ||
      lastname !== user?.lastname ||
      email !== user?.email;

    if (c !== hasChanges) {
      setHasChanges(c);
    }
  }, [user, password, firstname, lastname, email]);

  const save = () => {
    request(UPDATE_ME, { firstname, lastname, email }).then(
      (result: { updateMe: Mutation["updateMe"] }) => {
        mutate(GET_CURRENT_USER, { me: result.updateMe });
      }
    );
    if (password && password.length > 0) {
      request(UPDATE_PASSWORD, { oldPassword, newPassword: password }).then(
        (result: { updatePassword: Mutation["updatePassword"] }) => {
          if ("message" in result.updatePassword) {
            //TODO: display error
          } else {
            setPassword(null);
            setOldPassword(null);
          }
        }
      );
    }
  };

  const reset = () => {
    setPassword(null);
    setFirstname(user?.firstname);
    setLastname(user?.lastname);
    setEmail(user?.email);
  };

  useEffect(() => {
    if (!firstname) {
      setFirstname(user?.firstname);
    }
    if (!lastname) {
      setLastname(user?.lastname);
    }
    if (!email) {
      setEmail(user?.email);
    }
  }, [user]);

  if (!user) {
    //TODO: show loading placeholder?
    return null;
  }

  return (
    <>
      <h1>User information</h1>
      <div className="flex wrap">
        <Box width="half-on-large" paddingRight>
          <label className="label">User ID</label>
          <input
            className="input"
            type="text"
            value={user.username || ""}
            readOnly
          />
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small className="note">
            Note: If you leave this field empty, the password won&apos;t be
            changed.
          </small>
          {password && password.length > 0 && (
            <>
              <label className="label">Old Password</label>
              <input
                className="input"
                type="password"
                value={oldPassword || ""}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </>
          )}
          <button
            className="button margin-right"
            onClick={save}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
          <button className="button" onClick={reset} disabled={!hasChanges}>
            Reset
          </button>
        </Box>
        <Box width="half-on-large" paddingLeft>
          <label className="label">Firstname</label>
          <input
            className="input"
            type="text"
            value={firstname || ""}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label className="label">Lastname</label>
          <input
            className="input"
            type="text"
            value={lastname || ""}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label className="label">E-Mail</label>
          <input
            className="input"
            type="text"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </div>
    </>
  );
};

export default UserInformation;
