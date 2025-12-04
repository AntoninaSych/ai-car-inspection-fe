import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Alert } from '@mui/material';

export const TransferPaymentMethod = ({ t }) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <>
      <Box mt={2}>
        <Alert severity="info" sx={{ mb: 2 }}>
          {t(
            'payment:transfer.info',
            'After confirmation we will send you bank transfer details to the email you provided.'
          )}
        </Alert>

        <Controller
          name="payerName"
          control={control}
          rules={{
            required: t('payment:transfer.errors.payerNameRequired', 'Payer name is required'),
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('payment:transfer.payerName.label', 'Payer name')}
              margin="normal"
              fullWidth
              required
              error={!!errors.payerName}
              helperText={errors.payerName?.message}
            />
          )}
        />

        <Controller
          name="payerIban"
          control={control}
          rules={{
            pattern: {
              value: /^[A-Z]{2}[0-9A-Z]{13,30}$/i,
              message: t('payment:transfer.errors.payerIbanInvalid', 'Invalid IBAN'),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('payment:transfer.payerIban.label', 'Payer IBAN (optional)')}
              margin="normal"
              fullWidth
              error={!!errors.payerIban}
              helperText={errors.payerIban?.message}
            />
          )}
        />
      </Box>
    </>
  );
};
