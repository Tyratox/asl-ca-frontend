import { AppContext, withApp } from "../components/AppWrapper";
import { Maybe } from "../utilities/types";
import { useAuthenticate } from "../utilities/hooks";
import { useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import type { NextPage } from "next";

const Admin: NextPage = () => {
  const { user, token } = useContext(AppContext);
  const router = useRouter();

  const isAuthenticated = useAuthenticate();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && /*!user.isAdministrator*/ true) {
      router.push("/");
    }
  }, [isAuthenticated, user]);

  /*const { data, error } = useSWR<SystemResponse | ErrorResponse>(
    token ? ["/api/system", token] : null,
    (query) =>
      fetch(query, { method: "POST", body: JSON.stringify({ token }) }).then(
        (r) => r.json()
      )
  );*/

  if (!isAuthenticated || !user) {
    //TODO: show loading placeholder?
    return null;
  }

  return null;

  /*if (!data || "error" in data) {
    return (
      <Wrapper>
        <div className="flex wrap">
          <Box width="half-on-large" paddingRight>
            <h1>System Information</h1>
            Error when loading: {JSON.stringify(data ? data : error)}
          </Box>
          <Box width="half-on-large" paddingLeft></Box>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex wrap">
        <Box width="half-on-large" paddingRight>
          <h1>System Information</h1>
          <p>Current Serial Number: {data.serial}</p>
          <p>
            Number of issued certificates: {data.numberOfIssuedCertificates}
          </p>
          <p>
            Number of revoked certificates: {data.numberOfRevokedCertificates}
          </p>
        </Box>
        <Box width="half-on-large" paddingLeft></Box>
      </div>
    </Wrapper>
  );*/
};

export default withApp(Admin);
