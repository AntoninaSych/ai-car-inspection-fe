import * as yup from 'yup';

export const createValidationSchema = t => {
  const required = t('common:validation.required');

  return yup.object({
    name: yup
      .string()
      .min(3, t('common:validation.minString', { value: 3 }))
      .max(50, t('common:validation.maxString', { value: 50 }))
      .required(required),
    email: yup
      .string()
      .min(5, t('common:validation.minString', { value: 5 }))
      .max(50, t('common:validation.maxString', { value: 50 }))
      .email(t('common:validation.email'))
      .required(required),
    password: yup
      .string()
      .min(8, t('common:validation.minString', { value: 8 }))
      .max(18, t('common:validation.maxString', { value: 18 }))
      .required(required),
    agree: yup.boolean().oneOf([true], t('common:validation.agreements')).required(t('common:validation.agreements')),
  });
};
