import { colors } from "../../utilities/style";
import styled from "@emotion/styled";

const Button = styled.button<{ marginRight?: boolean }>`
  background-color: ${colors.primary};
  color: ${colors.primaryContrast};
  border: none;

  padding: 0.5rem 1rem;
  margin: 1rem ${({ marginRight }) => (marginRight ? "1rem" : "0")} 1rem 0;

  cursor: pointer;

  &:disabled {
    background-color: ${colors.disabled};
    cursor: not-allowed;
  }
`;

export default Button;
