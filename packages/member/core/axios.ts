import axios from "axios";
import Cookies from "universal-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  config.headers.Accept = "application/json";

  // add token
  const key = "jwt_token";
  const cookies = new Cookies();
  const token = cookies.get(key);
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
