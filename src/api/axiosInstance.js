import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const setupAxiosInterceptors = store => {
  api.interceptors.request.use(
    config => {
      const state = store.getState();
      const accessToken = state.auth.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // 👇 Додаємо поточну мову
      config.headers['Accept-Language'] = i18n.resolvedLanguage || 'en';

      return config;
    },
    error => Promise.reject(error)
  );
};

export default api;
