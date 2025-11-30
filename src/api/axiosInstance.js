import axios from 'axios';
import { store } from '../redux/store';

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;

const api = axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default api;
