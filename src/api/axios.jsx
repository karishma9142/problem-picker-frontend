import axios from "axios";

export const createAPI = (getToken) => {
  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  });

  // ✅ Attach token
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

  // ✅ Handle errors globally
  API.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log("API ERROR:", err.response?.data || err.message);
      return Promise.reject(err);
    }
  );

  return API;
};