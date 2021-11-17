import { AppContext } from "./AppWrapper";
import { useAuthenticate } from "../utilities/hooks";
import Box from "./Box";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { user } = useContext(AppContext);
  const isAuthenticated = useAuthenticate();

  return (
    <header className="header">
      <Head>
        <title>iMovies CA</title>
      </Head>
      <div className="container">
        <div className="flex">
          <Box width="header-small">
            <Link href="/">iMovies</Link>
          </Box>
          <Box width="header-large">
            <div className="header-links">
              {isAuthenticated && !user.isAdmin && (
                <Link href="/">Issue / Revoke Certificate</Link>
              )}
              {isAuthenticated && user && user.isAdmin && (
                <Link href="/admin">Admin Interface</Link>
              )}
              <Link href="/revocation-list">Revocation List</Link>
              {!isAuthenticated && <Link href="/login">Login</Link>}
              {isAuthenticated && <Link href="/logout">Logout</Link>}
            </div>
          </Box>
        </div>
      </div>
    </header>
  );
};

export default Header;
