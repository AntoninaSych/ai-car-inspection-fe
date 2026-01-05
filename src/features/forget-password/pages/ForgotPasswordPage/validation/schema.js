import * as yup from 'yup';

export const createSchema = t => {
  return yup.object({
    email: yup
      .string()
      .min(5, t('common:validation.minString', { value: 5 }))
      .max(50, t('common:validation.maxString', { value: 50 }))
      .email(t('common:validation.email'))
      .required(t('common:validation.required')),
  });
};
