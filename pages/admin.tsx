import { AppContext, withApp } from "../components/AppWrapper";
import {
  CERTIFICATE_COUNT,
  REVOKED_CERTIFICATE_COUNT,
  SERIAL_NUMBER,
} from "../graphql/certificates";
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

  const getSerialNumber = () => {
    const { data, error } = useSWR<{
      getSerialNumber: Query["getSerialNumber"];
    }>(SERIAL_NUMBER, (query) => request(query));
    if (!data || "error" in data) {
      return "Error when loading";
    }
    return data.getSerialNumber;
  };

  const getCertCount = () => {
    const { data, error } = useSWR<{
      getCertCount: Query["getCertCount"];
    }>(CERTIFICATE_COUNT, (query) => request(query));
    if (!data || "error" in data) {
      return "Error when loading";
    }
    return data.getCertCount;
  };

  const getRevCertCount = () => {
    const { data, error } = useSWR<{
      getRevokedCertCount: Query["getRevokedCertCount"];
    }>(REVOKED_CERTIFICATE_COUNT, (query) => request(query));
    if (!data || "error" in data) {
      return "Error when loading";
    }
    return data.getRevokedCertCount;
  };

  const serialNumber = getSerialNumber();
  const certCount = getCertCount();
  const revCertCout = getRevCertCount();

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
