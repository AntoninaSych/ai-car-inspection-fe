import * as yup from 'yup';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../../../../constants';

const createSchema = t => {
  const required = t('common:validation.required');

  return yup.object({
    password: yup
      .string()
      .min(PASSWORD_MIN, t('common:validation.minString', { value: PASSWORD_MIN }))
      .max(PASSWORD_MAX, t('common:validation.maxString', { value: PASSWORD_MAX }))
      .matches(/\d/, t('common:validation.matches.digit'))
      .required(required),
    confirmPassword: yup
      .string()
      .required(required)
      .oneOf([yup.ref('password')], t('common:validation.passwordMismatch')),
  });
};

export { PASSWORD_MIN, createSchema };
