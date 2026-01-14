import api from '../../../api/axiosInstance';

/**
 * GET /auth/reset-password/validate?token=...
 * Response example:
 *  - { valid: true }
 *  - { valid: false, reason: 'used' | 'expired' | 'invalid' }
 */
export const validateResetToken = async ({ token }) => {
  const { data } = await api.get('/auth/reset-password/validate', {
    params: { token },
  });
  return data;
};

/**
 * POST /auth/reset-password
 * body: { token, password }
 * Response example: { success: true }
 */
export const resetPassword = async ({ token, password }) => {
  const { data } = await api.post('/auth/reset-password', { token, password });
  return data;
};
