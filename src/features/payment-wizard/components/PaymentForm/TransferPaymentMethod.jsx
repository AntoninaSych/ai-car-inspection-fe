import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const TransferPaymentMethod = () => {
  const { t } = useTranslation('payment');
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <>
      <Box mt={2}>
        <Alert severity="info" sx={{ mb: 2 }}>
          {t('transfer.info')}
        </Alert>

        <Controller
          name="payerName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('fields.payerName.label')}
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
              message: t('validation.payerIbanInvalid'),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('fields.payerIban.label')}
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
