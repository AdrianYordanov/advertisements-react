// External
import axios from "axios";

// Cookies
import { getAuthorizationHeaders } from "../utils/Cookies";

export const getPublicAdvertisementsRequest = () => {
  return axios.get("advertisements");
};

export const getUserAdvertisementsRequest = () => {
  const headers = getAuthorizationHeaders();
  return axios.get("advertisements/my", { headers });
};

export const deleteAdvertisementRequest = (id: string) => {
  const headers = getAuthorizationHeaders();
  return axios.delete(`advertisements/${id}`, { headers });
};

export const postAdvertisementRequest = (advertisement: FormData) => {
  const headers = getAuthorizationHeaders();
  return axios.post("advertisements", advertisement, { headers });
};
