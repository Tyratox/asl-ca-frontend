import { CERTIFICATE_REVOCATION_LIST } from "../graphql/certificates";
import { Query } from "../schema";
import { withApp } from "../components/AppWrapper";
import Box from "../components/Box";
import Button from "../components/form/Button";
import Flex from "../components/Flex";
import React from "react";
import Wrapper from "../components/Wrapper";
import request from "../utilities/request";
import styled from "@emotion/styled";
import useSWR from "swr";
import type { NextPage } from "next";

const downloadList = (list: string) => {
  const a = document.createElement("a");
  a.href = "data:application/octet-stream;base64," + list;
  a.download = "crl.pem";
  a.click(); //Downloaded file
};

const Textarea = styled.textarea`
  width: 100%;
  font-family: monospace;
  padding: 1rem;
`;

const Home: NextPage = () => {
  const { data, error } = useSWR<{ crl: Query["crl"] }>(
    CERTIFICATE_REVOCATION_LIST,
    (query) => request(query)
  );

  if (!data || "error" in data) {
    return (
      <Wrapper>
        <Flex>
          <Box widths={[1, 1, 1 / 2, 1 / 2, 1 / 2]} marginRight={0.5}>
            <h1>Certificate Revocation List</h1>
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
        <Box widths={[1, 1, 1, 1, 1]}>
          <h1>Certificate Revocation List</h1>
          <Button onClick={() => downloadList(data.crl)}>Download List</Button>
          <Textarea readOnly rows={100} value={atob(data.crl)}></Textarea>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default withApp(Home);
