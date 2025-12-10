import axios from 'axios';
import i18n from '../i18n';
import { globalErrorHandler } from '../utils/notification';

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

      config.headers['Accept-Language'] = i18n.resolvedLanguage || 'en';

      return config;
    },
    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    response => response,
    error => {
      const config = error.config || {};
      const skipGlobalErrorHandler = config.skipGlobalErrorHandler;

      if (!skipGlobalErrorHandler) {
        globalErrorHandler(error, { t: i18n.t.bind(i18n) });
      }
      return Promise.reject(error);
    }
  );
};

export default api;
