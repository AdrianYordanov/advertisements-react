// External
import Cookies from "universal-cookie";

export const getAuthorizationHeaders = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return { Authorization: "Bearer " + token };
};

export const setCookies = (username: string, token: string) => {
  const cookies = new Cookies();
  cookies.set("token", token);
  cookies.set("username", username);
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
