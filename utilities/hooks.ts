import { AppContext } from "../components/AppWrapper";
import { isClient } from "./ssr";
import { useContext, useMemo } from "react";

export const useLocalStorage = (
  key: string
): [string | null, (value: string) => void] => {
  if (isClient) {
    return [
      localStorage.getItem(key),
      (value: string) => localStorage.setItem(key, value),
    ];
  } else {
    return [null, () => {}];
  }
};

export const useAuthenticate = () => {
  const { token } = useContext(AppContext);

  return token ? true : false;
};
