import axios from "axios";

const api = axios.create({
  baseURL: "https://dukaan-digital-backend.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Request: Har request ke saath token bhejna
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: Agar token expire ho jaye to logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;