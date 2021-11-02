//dependencies
import { GET_CURRENT_USER } from "../graphql/user";
import { Maybe } from "../utilities/types";
import { Query, User } from "../schema";
import { useLocalStorage } from "../utilities/hooks";
import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import request from "../utilities/request";
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

  const { data, error } = useSWR<{ me: Query["me"] }>(
    token ? GET_CURRENT_USER : null,
    (query) => request(query)
  );

  useEffect(() => {
    if (data && !("me" in data)) {
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
