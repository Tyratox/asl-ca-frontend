import { withApp } from "../components/AppWrapper";
import React from "react";
import Wrapper from "../components/Wrapper";
import type { NextPage } from "next";

const css: NextPage = () => {
  return (
    <Wrapper>
      <h1> user : a3 </h1>
      <h1> password : 6B97F534C330B5CC78D4CC23E01E48BE3377105B </h1>
    </Wrapper>
  );
};

export default withApp(css);
