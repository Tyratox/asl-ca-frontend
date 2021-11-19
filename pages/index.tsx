import { AppContext, withApp } from "../components/AppWrapper";
import { useAuthenticate } from "../utilities/hooks";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import UserCertificates from "../components/UserCertificates";
import UserInformation from "../components/UserInformation";
import Wrapper from "../components/Wrapper";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { user, token } = useContext(AppContext);
  const router = useRouter();

  const isAuthenticated = useAuthenticate();

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    //TODO: show loading placeholder?
    return null;
  }

  return (
    <Wrapper>
      <UserInformation
        user={user}
        token={token}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
      />
      <hr />
      <UserCertificates token={token} hasChanges={hasChanges} />

    </Wrapper>
  );
};

export default withApp(Home);
