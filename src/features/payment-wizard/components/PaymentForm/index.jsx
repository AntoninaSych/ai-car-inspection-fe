import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PAYMENT_METHODS } from '../../constants';
import { TransferPaymentMethod } from './TransferPaymentMethod';
import { CardPaymentMethod } from './CardPaymentMethod';
import { formatAmount } from '../../utils/helpers';

export const PaymentForm = () => {
  const { t } = useTranslation(['payment', 'common']);
  const { control, formState, watch } = useFormContext();
  const { errors } = formState;
  const paymentMethod = watch('paymentMethod');

  return (
    <>
      <Controller
        name="fullName"
        control={control}
        rules={{
          required: t('payment:errors.fullNameRequired', 'Full name is required'),
          minLength: { value: 2, message: t('payment:errors.fullNameShort', 'Name is too short') },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('payment:fields.fullName.label', 'Full name')}
            margin="normal"
            fullWidth
            required
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: t('payment:errors.emailRequired', 'Email is required'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('payment:errors.emailInvalid', 'Invalid email format'),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label={t('payment:fields.email.label', 'Email for receipt')}
            margin="normal"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        rules={{
          required: t('payment:errors.amountRequired', 'Amount is required'),
          validate: value => {
            const num = parseFloat((value || '').replace(',', '.'));
            return num > 0 || t('payment:errors.amountInvalid', 'Enter a valid amount');
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label={t('payment:fields.amount.label', { currency: 'USD' })}
            margin="normal"
            fullWidth
            required
            error={!!errors.amount}
            helperText={errors.amount?.message}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
              },
            }}
            onBlur={() => {
              field.onChange(formatAmount(field.value || ''));
            }}
          />
        )}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label={t('payment:method.label', 'Payment method')} margin="normal" fullWidth>
            <MenuItem value="transfer">{t('payment:method.transfer', 'Bank transfer')}</MenuItem>
            <MenuItem value="card">{t('payment:method.card', 'Bank card')}</MenuItem>
          </TextField>
        )}
      />

      <Box sx={{ p: 3, pt: 0 }}>
        {paymentMethod === PAYMENT_METHODS.CARD && <CardPaymentMethod t={t} />}
        {paymentMethod === PAYMENT_METHODS.TRANSFER && <TransferPaymentMethod t={t} />}
      </Box>
    </>
  );
};
