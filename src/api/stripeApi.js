import api from './axiosInstance';

export const createStripeCheckoutSession = async ({ task_id, amount, currency }) => {
  const { data } = await api.post('/stripe/checkout-session', { task_id, amount, currency });
  return data;
};

export const getStripeCheckoutSession = async sessionId => {
  const { data } = await api.get(`/stripe/checkout-session/${sessionId}`);
  return data;
};
