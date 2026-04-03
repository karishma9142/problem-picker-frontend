import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// ⚠️ We cannot use hooks directly here
// so we create a function instead

export const createAPI = (getToken) => {
  const API = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  API.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return API;
};