// External
import axios from "axios";

// Utilities
import { IUser } from "../utils/Contracts";
import { getAuthorizationHeaders } from "../utils/Cookies";

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
