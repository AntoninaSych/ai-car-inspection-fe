import * as yup from 'yup';
const createSchema = t => {
  const required = t('common:validation.required');

  return yup.object({
    email: yup
      .string()
      .min(5, t('common:validation.minString', { value: 5 }))
      .max(50, t('common:validation.maxString', { value: 50 }))
      .email(t('common:validation.email'))
      .required(required),
  });
};

export { createSchema };
