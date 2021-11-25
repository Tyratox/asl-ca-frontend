import { withApp } from "../components/AppWrapper";
import React from "react";
import type { NextPage } from "next";

const css: NextPage = () => {
  return <h1 style={{ display: "the user a3 is special" }}></h1>;
};

export default withApp(css);
