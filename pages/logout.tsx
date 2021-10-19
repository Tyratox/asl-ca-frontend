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

const Logout: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("auth-token");
    router.push("/login");
  }, []);

  return (
    <Wrapper>
      <h1>Logging out...</h1>
      <p>You will be redirected after the logout.</p>
    </Wrapper>
  );
};

export default withApp(Logout);
