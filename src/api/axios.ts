// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api', // Change this if needed
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// // Inject token from Zustand (localStorage) before request
// api.interceptors.request.use((config) => {
//   const raw = localStorage.getItem('auth-storage');
//   if (raw) {
//     const { state } = JSON.parse(raw);
//     if (state?.token) {
//       config.headers.Authorization = `Bearer ${state.token}`;
//     }
//   }
//   return config;
// });

// export default api;

import axios from 'axios';
import ipconfig from '../ipconfig';

const api = axios.create({
  baseURL: `${ipconfig}/api`, // Change this if needed
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor – attach token
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth-storage');
  if (raw) {
    const { state } = JSON.parse(raw);
    if (state?.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

// Response interceptor – remove token on 401/403
api.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem('auth-storage');
      // Optional: redirect to login
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
