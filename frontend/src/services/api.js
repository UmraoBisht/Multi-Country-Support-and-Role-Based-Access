import axios from "axios";

const api = axios.create({
  baseURL: "https://multi-country-support-and-role-based.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
