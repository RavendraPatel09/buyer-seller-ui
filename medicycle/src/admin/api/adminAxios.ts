import axios from 'axios';

const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_URL || '/api/admin';
const ADMIN_TOKEN_KEY = 'medicycle_admin_token';

export const adminAxios = axios.create({
  baseURL: ADMIN_API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach admin JWT
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 / 403
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      // Redirect to admin login
      if (window.location.pathname !== '/login') {
        window.location.href = '/admin.html';
      }
    }
    return Promise.reject(error);
  }
);
