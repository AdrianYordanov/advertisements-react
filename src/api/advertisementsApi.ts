import axios from "axios";

import { getAuthorizationHeaders } from "../utils/cookies";

export const getPublicAdvertisementsRequest = () => {
  return axios.get("/advertisements");
};

export const getUserAdvertisementsRequest = () => {
  const headers = getAuthorizationHeaders();
  return axios.get("/advertisements/my", { headers });
};

export const deleteAdvertisementRequest = (id: string) => {
  const headers = getAuthorizationHeaders();
  return axios.delete(`/advertisements/${id}`, { headers });
};

export const postAdvertisementRequest = (advertisement: FormData) => {
  const headers = getAuthorizationHeaders();
  return axios.post("/advertisements", advertisement, { headers });
};
