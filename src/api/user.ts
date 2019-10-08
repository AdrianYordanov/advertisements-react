import axios from "axios";

import { IUserForm } from "src/typeScript/contracts";

export const loginRequest = (user: IUserForm) => {
  return axios.post("users/login", user);
};

export const registerRequest = (user: IUserForm) => {
  return axios.post("users/register", user);
};
