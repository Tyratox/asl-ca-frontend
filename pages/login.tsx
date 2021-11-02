import { AUTHENTICATE } from "../graphql/user";
import { AppContext, withApp } from "../components/AppWrapper";
import { AuthenticationResult, Mutation } from "../schema";
import { NextPage } from "next";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import Box from "../components/Box";
import Button from "../components/form/Button";
import Flex from "../components/Flex";
import Input from "../components/form/Input";
import Label from "../components/form/Label";
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
      <Flex>
        <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginRight={0.5}>
          <h1>Login</h1>
          <Label>User ID</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={login}>Login</Button> or{" "}
          <Button
            onClick={() => {
              window.location.href = CERT_LOGIN_URL;
            }}
          >
            Login using Certificate
          </Button>
        </Box>
        <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginLeft={0.5}>
          <h1>Information</h1>
          You can either log in using your user ID and your password or using a
          TLS certificate. CA Administrators must always log in using their TLS
          certificate.
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default withApp(Login);
