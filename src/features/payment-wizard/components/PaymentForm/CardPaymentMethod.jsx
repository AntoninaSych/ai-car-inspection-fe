import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getCardBrand, formatCardNumber, formatCardExpiry } from '../../utils/helpers';

export const CardPaymentMethod = () => {
  const { t } = useTranslation('payment');
  const { control, formState, watch } = useFormContext();
  const { errors } = formState;
  const cardNumberValue = watch('cardNumber');
  const cardNumberDigits = (cardNumberValue || '').replace(/\D/g, '');
  const cardType = getCardBrand(cardNumberDigits);

  return (
    <Box mt={2}>
      <Typography variant="h6" mb={1}>
        {t('card.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {t('card.description')}
      </Typography>

      <Controller
        name="cardHolder"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('fields.cardHolder.label')}
            margin="normal"
            fullWidth
            required
            error={!!errors.cardHolder}
            helperText={errors.cardHolder?.message}
          />
        )}
      />

      <Controller
        name="cardNumber"
        control={control}
        rules={{
          validate: value => {
            const digits = (value || '').replace(/\D/g, '');
            if (digits.length < 13 || digits.length > 19) {
              return t('validation.cardNumberInvalid');
            }
            return true;
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('fields.cardNumber.label')}
            margin="normal"
            autoComplete="off"
            fullWidth
            required
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message || (cardType ? t('fields.cardType.label') + `: ${cardType}` : '')}
            onChange={e => {
              const formatted = formatCardNumber(e.target.value);
              field.onChange(formatted);
            }}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                maxLength: 23, // 19 numbers + spaces
              },
            }}
          />
        )}
      />

      <Grid container columnSpacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="cardExpiry"
            control={control}
            rules={{
              pattern: {
                // MM/YY
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: t('validation.cardExpiryInvalid'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('fields.cardExpiry.label')}
                margin="normal"
                autoComplete="off"
                fullWidth
                required
                error={!!errors.cardExpiry}
                helperText={errors.cardExpiry?.message}
                placeholder="MM/YY"
                slotProps={{
                  htmlInput: {
                    inputMode: 'numeric',
                    maxLength: 5,
                  },
                }}
                onChange={e => {
                  const formatted = formatCardExpiry(e.target.value);
                  field.onChange(formatted);
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="cardCvv"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: t('validation.cardCvvInvalid'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('fields.cardCvv.label')}
                margin="normal"
                autoComplete="off"
                fullWidth
                required
                error={!!errors.cardCvv}
                helperText={errors.cardCvv?.message}
                slotProps={{
                  htmlInput: {
                    inputMode: 'numeric',
                    maxLength: 3,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
