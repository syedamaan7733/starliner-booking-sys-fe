import  axios  from "axios";
import { authToken } from "./token.service";

const BASE_URL = `http://localhost:8080/api/v1`;

export const api = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = authToken.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("User is unauthorized! Redirecting to login...");
      window.dispatchEvent(new Event("auth:unauthorized"));
    } else if (error.response && error.response.status === 400) {
      console.log("Bad request: THere is something wrong with requedst");
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);
