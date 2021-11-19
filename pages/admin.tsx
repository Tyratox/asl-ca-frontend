import { ADMIN_INTERFACE_DATA } from "../graphql/certificates";
import { AppContext, withApp } from "../components/AppWrapper";
import { Maybe } from "../utilities/types";
import { Query } from "../schema";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import Box from "../components/Box";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import request from "../utilities/request";
import useSWR from "swr";
import type { NextPage } from "next";

const Admin: NextPage = () => {
  const { user, token } = useContext(AppContext);
  const router = useRouter();

  const isAuthenticated = useAuthenticate();

  const { data, error } = useSWR<{
    getSerialNumber: Query["getSerialNumber"];
    getRevokedCertCount: Query["getRevokedCertCount"];
    getCertCount: Query["getCertCount"];
  }>(ADMIN_INTERFACE_DATA, (query) => request(query));

  const serialNumber = (data && data.getSerialNumber) || "Error when loading";
  const certCount = (data && data.getCertCount) || "Error when loading";
  const revCertCout =
    (data && data.getRevokedCertCount) || "Error when loading";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !user.isAdmin) {
      router.push("/");
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    //TODO: show loading placeholder?
    return null;
  }

  return (
    <Wrapper>
      <div className="flex wrap">
        <Box width="half-on-large" paddingRight>
          <h1>System Information</h1>
          <p>Current Serial Number: {serialNumber}</p>
          <p>Number of issued certificates: {certCount}</p>
          <p>Number of revoked certificates: {revCertCout}</p>
        </Box>
        <Box width="half-on-large" paddingLeft></Box>
      </div>
    </Wrapper>
  );
};

export default withApp(Admin);
