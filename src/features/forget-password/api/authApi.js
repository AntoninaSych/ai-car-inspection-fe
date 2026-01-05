import api from '../../../api/axiosInstance';

/**
 * POST /auth/forgot-password
 * body: { email }
 * Response: ideally 200 always (to avoid email enumeration).
 * Could also return 429 for daily rate limit.
 */
export const requestPasswordReset = async ({ email }) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

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
