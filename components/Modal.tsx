import { createPortal } from "react-dom";
import React, { FunctionComponent, useMemo } from "react";

const Modal: FunctionComponent = ({ children }) => {
  const modalRoot = useMemo(() => document.getElementById("modal-root"), []);

  if (modalRoot) {
    return createPortal(children, modalRoot);
  } else {
    return <div>Modal root has not been found!</div>;
  }
};

export default Modal;
