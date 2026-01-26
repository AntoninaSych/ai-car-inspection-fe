import api from '../../../api/axiosInstance';

export const verifyEmail = async ({ token }) => {
  const { data } = await api.get('/auth/verify-email', {
    skipGlobalErrorHandler: true,
    params: { token },
  });
  return data;
};

export const resendVerification = async ({ email }) => {
  const { data } = await api.post('/auth/resend-verification', {
    email,
  });
  return data;
};
