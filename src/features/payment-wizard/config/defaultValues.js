import { PAYMENT_METHODS } from '../constants';

export const defaultValues = {
  fullName: '',
  email: '',
  paymentMethod: PAYMENT_METHODS.TRANSFER,
  amount: '15.00',
  // card fields
  cardHolder: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  // bank transfer fields
  payerName: '',
  payerIban: '',
};
