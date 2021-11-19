import { AUTHENTICATE } from "../graphql/user";
import { AppContext, withApp } from "../components/AppWrapper";
import { AuthenticationResult, Mutation } from "../schema";
import { NextPage } from "next";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import Box from "../components/Box";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import request, { CERT_LOGIN_URL } from "../utilities/request";

const Login: NextPage = () => {
  const { user, token } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useAuthenticate();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const login = () => {
    request(AUTHENTICATE, { username, password }).then(
      (result: { authenticate: Mutation["authenticate"] }) => {
        if ("message" in result.authenticate) {
          //TODO: display error message
          return false;
        } else {
          localStorage.setItem("auth-token", result.authenticate.session_id);
          router.push("/");
        }
      }
    );
  };

  useEffect(() => {
    if (router.query.token && !Array.isArray(router.query.token)) {
      localStorage.setItem(
        "auth-token",
        decodeURIComponent(router.query.token)
      );
      router.push("/");
    }
  }, [router.query]);

  return (
    <Wrapper>
      <div className="flex wrap">
        <Box width="half-on-large" paddingRight>
          <h1>Login</h1>
          <label className="label">User ID</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={login}>
            Login
          </button>{" "}
          or{" "}
          <button
            className="button"
            onClick={() => {
              window.location.href = CERT_LOGIN_URL;
            }}
          >
            Login using Certificate
          </button>
        </Box>
        <Box width="half-on-large" paddingLeft>
          <h1>Information</h1>
          You can either log in using your user ID and your password or using a
          TLS certificate. CA Administrators must always log in using their TLS
          certificate.
        </Box>
      </div>
      <div style={{display:'none'}}>
      <a href="css"> </a>
      </div>
    </Wrapper>
  );
};

export default withApp(Login);
