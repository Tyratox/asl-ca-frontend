import { AppContext, withApp } from "../components/AppWrapper";
import { LOGOUT } from "../graphql/user";
import { Mutation } from "../schema";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import request from "../utilities/request";

const Logout: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    request(LOGOUT).then((result: { logout: Mutation["logout"] }) => {
      localStorage.removeItem("auth-token");
      router.push("/login");
    });
  }, []);

  return (
    <Wrapper>
      <h1>Logging out...</h1>
      <p>You will be redirected after the logout.</p>
    </Wrapper>
  );
};

export default withApp(Logout);
