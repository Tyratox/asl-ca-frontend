import Header from "./Header";
import React, { FunctionComponent } from "react";

const Wrapper: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export default Wrapper;
