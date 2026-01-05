import * as yup from 'yup';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../../constants';

const createValidationSchema = t => {
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
      .min(PASSWORD_MIN, t('common:validation.minString', { value: PASSWORD_MIN }))
      .max(PASSWORD_MAX, t('common:validation.maxString', { value: PASSWORD_MAX }))
      .matches(/\d/, t('common:validation.matches.digit'))
      .required(required),
    // agree: yup.boolean().oneOf([true], t('common:validation.agreements')).required(t('common:validation.agreements')),
  });
};

export { PASSWORD_MIN, createValidationSchema };
