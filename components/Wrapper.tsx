import Container from "./Container";
import Header from "./Header";
import React, { FunctionComponent } from "react";

const Wrapper: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default Wrapper;
