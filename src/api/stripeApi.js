import api from './axiosInstance';
import { formatToCamelCase } from './utils';

export const createStripeCheckoutSession = async data => {
  const response = await api.post('/stripe/checkout-session', data);
  return formatToCamelCase(response.data);
};

export const getStripeCheckoutSession = async sessionId => {
  const response = await api.get(`/stripe/checkout-session/${sessionId}`);
  return formatToCamelCase(response.data);
};
