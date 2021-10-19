//dependencies
import { ErrorResponse, Maybe, User } from "../utilities/types";
import { useLocalStorage } from "../utilities/hooks";
import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";

export const AppContext = React.createContext<{
  user: Maybe<User>;
  token: Maybe<string>;
}>({
  user: null,
  token: null,
});

const AppWrapper: FunctionComponent = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth-token");

  const { data, error } = useSWR<
    | {
        me: User;
      }
    | ErrorResponse
  >(token ? ["/api/users/me", token] : null, (query) =>
    fetch(query, { method: "POST", body: JSON.stringify({ token }) }).then(
      (r) => r.json()
    )
  );

  useEffect(() => {
    if (data && "error" in data) {
      localStorage.removeItem("auth-token");
    }
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        user: token && data && "me" in data ? data.me : null,
        token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const withApp = (Component: React.JSXElementConstructor<any>) =>
  React.memo((props: any) => {
    return (
      <AppWrapper>
        <Component {...props} />
      </AppWrapper>
    );
  });

export default AppWrapper;
