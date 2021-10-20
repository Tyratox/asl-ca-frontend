import { AppContext, withApp } from "../components/AppWrapper";
import { ErrorResponse, Maybe } from "../utilities/types";
import { SystemResponse } from "./api/system";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import Box from "../components/Box";
import Button from "../components/form/Button";
import Flex from "../components/Flex";
import React, { useContext, useEffect, useMemo, useState } from "react";
import UserCertificates from "../components/UserCertificates";
import UserInformation from "../components/UserInformation";
import Wrapper from "../components/Wrapper";
import useSWR, { mutate } from "swr";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { user, token } = useContext(AppContext);
  const router = useRouter();

  const isAuthenticated = useAuthenticate();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && /*!user.isAdministrator*/ true) {
      router.push("/");
    }
  }, [isAuthenticated, user]);

  const { data, error } = useSWR<SystemResponse | ErrorResponse>(
    token ? ["/api/system", token] : null,
    (query) =>
      fetch(query, { method: "POST", body: JSON.stringify({ token }) }).then(
        (r) => r.json()
      )
  );

  if (!isAuthenticated || !user) {
    //TODO: show loading placeholder?
    return null;
  }

  if (!data || "error" in data) {
    return (
      <Wrapper>
        <Flex>
          <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginRight={0.5}>
            <h1>System Information</h1>
            Error when loading: {JSON.stringify(data ? data : error)}
          </Box>
          <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginLeft={0.5}></Box>
        </Flex>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Flex>
        <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginRight={0.5}>
          <h1>System Information</h1>
          <p>Current Serial Number: {data.serial}</p>
          <p>
            Number of issued certificates: {data.numberOfIssuedCertificates}
          </p>
          <p>
            Number of revoked certificates: {data.numberOfRevokedCertificates}
          </p>
        </Box>
        <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginLeft={0.5}></Box>
      </Flex>
    </Wrapper>
  );
};

export default withApp(Home);
