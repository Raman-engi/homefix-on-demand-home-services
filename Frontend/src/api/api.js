import axios from 'axios';

// Get backend URL from environment variables, fallback to live backend
const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // If using cookies or sessions:
  withCredentials: true,
});

// Automatically attach auth token to requests if it exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("homefix_token") ||
      sessionStorage.getItem("homefix_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
