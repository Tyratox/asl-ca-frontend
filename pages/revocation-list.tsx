import { CERTIFICATE_REVOCATION_LIST } from "../graphql/certificates";
import { Query } from "../schema";
import { withApp } from "../components/AppWrapper";
import Box from "../components/Box";
import React from "react";
import Wrapper from "../components/Wrapper";
import request from "../utilities/request";
import useSWR from "swr";
import type { NextPage } from "next";

const downloadList = (list: string) => {
  const a = document.createElement("a");
  a.href = "data:application/octet-stream;base64," + list;
  a.download = "crl.pem";
  a.click(); //Downloaded file
};

const RevocationList: NextPage = () => {
  const { data, error } = useSWR<{ crl: Query["crl"] }>(
    CERTIFICATE_REVOCATION_LIST,
    (query) => request(query)
  );

  if (!data || "error" in data) {
    return (
      <Wrapper>
        <div className="flex wrap">
          <Box width="half-on-large" paddingRight>
            <h1>Certificate Revocation List</h1>
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
        <Box width="full" paddingRight>
          <h1>Certificate Revocation List</h1>
          <button className="button" onClick={() => downloadList(data.crl)}>
            Download List
          </button>
          <textarea
            className="textarea monospace"
            readOnly
            rows={100}
            value={atob(data.crl)}
          ></textarea>
        </Box>
      </div>
    </Wrapper>
  );
};

export default withApp(RevocationList);
