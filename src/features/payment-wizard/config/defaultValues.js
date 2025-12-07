import { PAYMENT_METHODS } from '../constants';

export const defaultValues = {
  fullName: '',
  paymentMethod: PAYMENT_METHODS.CARD,
  amount: '1.50',
  // card fields
  cardHolder: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  // bank transfer fields
  payerName: '',
  payerIban: '',
};
