import { AppContext, withApp } from "../components/AppWrapper";
import { Maybe } from "../utilities/types";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import Box from "../components/Box";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import useSWR from "swr";
import type { NextPage } from "next";

const Admin: NextPage = () => {
  const { user, token } = useContext(AppContext);
  const router = useRouter();

  const isAuthenticated = useAuthenticate();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !user.isAdmin) {
      console.log(user);
      router.push("/");
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    //TODO: show loading placeholder?
    return null;
  }
  let admin = "FALSE";
  if (user.isAdmin) admin = "TRUE";
  return (
    <Wrapper>
      <div className="flex wrap">
        <Box width="half-on-large" paddingRight>
          <h1>System Information</h1>
          <p>Is admin? {admin}</p>
          <p>Current Serial Number: {user.certificates.length}</p>
          <p>Number of issued certificates: {user.certificates.length}</p>
          <p>
            Number of revoked certificates:{" "}
            {user.certificates.filter((c) => c.is_revoked === true).length}
          </p>
        </Box>
        <Box width="half-on-large" paddingLeft></Box>
      </div>
    </Wrapper>
  );

  /*if (!data || "error" in data) {
    return (
      <Wrapper>
        <div className="flex wrap">
          <Box width="half-on-large" paddingRight>
            <h1>System Information</h1>
            Error when loading: {JSON.stringify(data ? data : error)}
          </Box>
          <Box width="half-on-large" paddingLeft></Box>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex wrap">
        <Box width="half-on-large" paddingRight>
          <h1>System Information</h1>
          <p>Current Serial Number: {data.serial}</p>
          <p>
            Number of issued certificates: {data.numberOfIssuedCertificates}
          </p>
          <p>
            Number of revoked certificates: {data.numberOfRevokedCertificates}
          </p>
        </Box>
        <Box width="half-on-large" paddingLeft></Box>
      </div>
    </Wrapper>
  );*/
};

export default withApp(Admin);
