import Cookies from "universal-cookie";

import { IUserState } from "./contracts";

export const getAuthorizationHeaders = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return { Authorization: "Bearer " + token };
};

export const setCookies = (user: IUserState, cookiesExpInHours: number) => {
  const { username, token } = user;
  const cookies = new Cookies();
  const expirationDate = new Date(
    Date.now() + cookiesExpInHours * 60 * 60 * 1000
  );
  cookies.set("token", token, { path: "/", expires: expirationDate });
  cookies.set("username", username, { path: "/", expires: expirationDate });
};

export const removeCookies = () => {
  const cookies = new Cookies();
  cookies.remove("token");
  cookies.remove("username");
};

export const getToken = () => {
  const cookies = new Cookies();
  return cookies.get("token");
};

export const getUsername = () => {
  const cookies = new Cookies();
  return cookies.get("username");
};
