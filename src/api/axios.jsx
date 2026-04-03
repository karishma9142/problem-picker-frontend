import axios from "axios";
import { useAuth } from "@clerk/clerk-react";



export const createAPI = (getToken) => {
  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  API.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.log("Token error:", err);
    return config;
  }
});

  return API;
};