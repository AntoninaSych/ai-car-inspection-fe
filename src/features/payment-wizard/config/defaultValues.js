import { PAYMENT_METHODS } from '../constants';

export const DEFAULT_CURRENCY = 'usd';

export const defaultValues = {
  fullName: '',
  paymentMethod: PAYMENT_METHODS.STRIPE,
  amount: '1.50',
  currency: DEFAULT_CURRENCY,
  // card fields
  cardHolder: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  // bank transfer fields
  payerName: '',
  payerIban: '',
};
