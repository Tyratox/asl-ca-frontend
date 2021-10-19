import { colors } from "../utilities/style";
import { useAuthenticate } from "../utilities/hooks";
import Box from "./Box";
import Container from "./Container";
import Flex from "./Flex";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";

const StyledHeader = styled.div`
  padding: 2rem;
  margin-bottom: 1rem;

  background-color: ${colors.primary};
  color: ${colors.primaryContrast};
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    margin-right: 1rem;
  }
`;

const Header = () => {
  const isAuthenticated = useAuthenticate();

  return (
    <StyledHeader>
      <Head>
        <title>iMovies CA</title>
      </Head>
      <Container>
        <Flex>
          <Box widths={[1 / 3, 1 / 4, 1 / 5, 1 / 6]}>iMovies</Box>
          <Box widths={[2 / 3, 3 / 4, 4 / 5, 5 / 6]}>
            <Links>
              {!isAuthenticated && <Link href="/login">Login</Link>}
              {isAuthenticated && <Link href="/logout">Logout</Link>}
            </Links>
          </Box>
        </Flex>
      </Container>
    </StyledHeader>
  );
};

export default Header;
