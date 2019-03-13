import axios from "axios";

import { IUser } from "../utils/contracts";
import { getAuthorizationHeaders } from "../utils/cookies";

export const loginRequest = (user: IUser) => {
  return axios.post("users/login", user);
};

export const registerRequest = (user: IUser) => {
  return axios.post("users/register", user);
};

export const checkUserTokenRequest = () => {
  const headers = getAuthorizationHeaders();
  return axios.get("users/check", { headers });
};
