import axios from "axios";

import { IUser } from "../typeScript/contracts/contracts";

export const loginRequest = (user: IUser) => {
  return axios.post("users/login", user);
};

export const registerRequest = (user: IUser) => {
  return axios.post("users/register", user);
};
