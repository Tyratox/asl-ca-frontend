import { colors } from "../../utilities/style";
import React from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  border: #000 1px solid;
  width: 100%;

  padding: 0.25rem 0.5rem;
  margin: 0.5rem 0;

  &:read-only {
    background-color: ${colors.readOnly};
    cursor: not-allowed;
  }
`;

export default Input;
