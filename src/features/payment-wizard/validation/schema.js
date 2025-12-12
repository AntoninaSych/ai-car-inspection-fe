import * as yup from 'yup';
import { ALLOWED_PAYMENT_METHODS, ALLOWED_CURRENCY, PAYMENT_METHODS } from '../constants';

export const createPaymentWizardSchema = t =>
  yup.object({
    fullName: yup
      .string()
      .required(t('common:validation.required'))
      .max(100, t('common:validation.maxString', { value: 100 }))
      .min(2, t('common:validation.minString', { value: 2 })),
    paymentMethod: yup
      .string()
      .required('common:validation.required')
      .oneOf(ALLOWED_PAYMENT_METHODS, t('common:validation.oneOf', { value: ALLOWED_PAYMENT_METHODS.join(', ') })),
    amount: yup
      .number()
      .typeError(t('common:validation.number'))
      .required(t('common:validation.required'))
      .min(0.5, t('common:validation.min', { value: 0.5 })),
    currency: yup
      .string()
      .oneOf(ALLOWED_CURRENCY, t('common:validation.oneOf', { value: ALLOWED_CURRENCY.join(', ') }))
      .required(t('common:validation.required')),
    cardHolder: yup.string().when('paymentMethod', {
      is: PAYMENT_METHODS.CARD,
      then: schema =>
        schema
          .required(t('common:validation.required'))
          .max(100, t('common:validation.maxString', { value: 100 }))
          .min(2, t('common:validation.minString', { value: 2 })),
      otherwise: schema => schema.notRequired(),
    }),
    cardNumber: yup.string().when('paymentMethod', {
      is: PAYMENT_METHODS.CARD,
      then: schema => schema.required(t('common:validation.required')),
      otherwise: schema => schema.notRequired(),
    }),
    cardExpiry: yup.string().when('paymentMethod', {
      is: PAYMENT_METHODS.CARD,
      then: schema =>
        schema.required(t('common:validation.required')).max(5, t('common:validation.maxString', { value: 5 })),
      otherwise: schema => schema.notRequired(),
    }),
    cardCvv: yup.string().when('paymentMethod', {
      is: PAYMENT_METHODS.CARD,
      then: schema =>
        schema.required(t('common:validation.required')).max(3, t('common:validation.maxString', { value: 3 })),
      otherwise: schema => schema.notRequired(),
    }),
    payerName: yup.string().when('paymentMethod', {
      is: PAYMENT_METHODS.TRANSFER,
      then: schema =>
        schema
          .required(t('common:validation.required'))
          .max(100, t('common:validation.maxString', { value: 100 }))
          .min(2, t('common:validation.minString', { value: 2 })),
      otherwise: schema => schema.notRequired(),
    }),
    payerIban: yup.string().when('paymentMethod', {
      is: PAYMENT_METHODS.TRANSFER,
      then: schema => schema.optional(),
      otherwise: schema => schema.notRequired(),
    }),
  });
