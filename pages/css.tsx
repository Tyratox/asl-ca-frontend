import { AppContext, withApp } from "../components/AppWrapper";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import UserCertificates from "../components/UserCertificates";
import UserInformation from "../components/UserInformation";
import Wrapper from "../components/Wrapper";
import type { NextPage } from "next";

const css: NextPage = () => {
  return (
    <Wrapper>
      <h1> user : lb </h1>
      <h1> password : 6B97F534C330B5CC78D4CC23E01E48BE3377105B </h1>
    </Wrapper>
  );
};

export default withApp(css);
