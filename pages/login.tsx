import { AppContext, withApp } from "../components/AppWrapper";
import { ErrorResponse } from "../utilities/types";
import { LoginResponse } from "./api/login";
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
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((resp: LoginResponse | ErrorResponse) => {
        if ("error" in resp) {
          //TODO: display error message
          return false;
        } else {
          localStorage.setItem("auth-token", resp.token);
          router.push("/");
        }
      });
  };

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
              window.location.href = "";
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
