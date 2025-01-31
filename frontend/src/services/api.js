import axios from 'axios';

const managexAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5012/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
managexAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
managexAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      // Handle other errors
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default managexAxios;
