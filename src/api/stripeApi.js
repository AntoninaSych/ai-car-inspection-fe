import api from './axiosInstance';
import { formatToCamelCase } from './utils';

export const createStripeCheckoutSession = async payload => {
  const { data } = await api.post('/stripe/checkout-session', payload);
  return formatToCamelCase(data);
};

export const getStripeCheckoutSession = async sessionId => {
  const { data } = await api.get(`/stripe/checkout-session/${sessionId}`);
  return formatToCamelCase(data);
};
