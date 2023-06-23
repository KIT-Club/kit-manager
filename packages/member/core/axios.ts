import axios from "axios";
import LocalStorageService from "../service/LocalStorage.service";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const token = LocalStorageService.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
