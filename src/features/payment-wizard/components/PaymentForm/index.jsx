import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, TextField, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ALLOWED_PAYMENT_METHODS, PAYMENT_METHODS } from '../../constants';
import { TransferPaymentMethod } from './TransferPaymentMethod';
import { CardPaymentMethod } from './CardPaymentMethod';
import { StripePaymentMethod } from './StripePaymentMethod';
import { formatAmount } from '../../utils/helpers';

export const PaymentForm = () => {
  const { t } = useTranslation('payment');
  const { control, formState, watch } = useFormContext();
  const { errors } = formState;
  const paymentMethod = watch('paymentMethod');

  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('fields.fullName.label')}
                margin="normal"
                fullWidth
                required
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="amount"
            control={control}
            rules={{
              validate: value => {
                const num = parseFloat((value || '').replace(',', '.'));
                return num > 0 || t('validation.amountInvalid');
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label={t('fields.amount.label', { currency: 'USD' })}
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
                disabled
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label={t('fields.paymentMethod.label')} margin="normal" fullWidth>
                {ALLOWED_PAYMENT_METHODS.map(method => (
                  <MenuItem key={method} value={method}>
                    {t(`paymentMethod.${method}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ p: 3, pt: 0 }}>
        {paymentMethod === PAYMENT_METHODS.CARD && <CardPaymentMethod />}
        {paymentMethod === PAYMENT_METHODS.STRIPE && <StripePaymentMethod />}
        {paymentMethod === PAYMENT_METHODS.TRANSFER && <TransferPaymentMethod />}
      </Box>
    </>
  );
};
