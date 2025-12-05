import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { getCardBrand, formatCardNumber, formatCardExpiry } from '../../utils/helpers';

export const CardPaymentMethod = ({ t }) => {
  const { control, formState, watch } = useFormContext();
  const { errors } = formState;
  const cardNumberValue = watch('cardNumber');
  const cardNumberDigits = (cardNumberValue || '').replace(/\D/g, '');
  const cardBrand = getCardBrand(cardNumberDigits);

  return (
    <Box mt={2}>
      <Typography variant="h6" mb={1}>
        {t('card.title', 'Bank card details')}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {t('card.description', 'We do not store your card details. Please use a card that supports online payments.')}
      </Typography>

      <Controller
        name="cardHolder"
        control={control}
        rules={{
          required: t('card.errors.cardHolderRequired', 'Card holder name is required'),
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('card.cardHolder.label', 'Card holder name')}
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
          required: t('card.errors.cardNumberRequired', 'Card number is required'),
          validate: value => {
            const digits = (value || '').replace(/\D/g, '');
            if (digits.length < 13 || digits.length > 19) {
              return t('card.errors.cardNumberInvalid', 'Invalid card number');
            }
            return true;
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('card.cardNumber.label', 'Card number')}
            margin="normal"
            autoComplete="off"
            fullWidth
            required
            error={!!errors.cardNumber}
            helperText={
              errors.cardNumber?.message || (cardBrand ? t('card.brand.label', 'Card type') + `: ${cardBrand}` : '')
            }
            onChange={e => {
              const formatted = formatCardNumber(e.target.value);
              field.onChange(formatted);
            }}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                maxLength: 23, // 19 цифр + spaces
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
              required: t('card.errors.cardExpiryRequired', 'Expiry date is required'),
              pattern: {
                // формат MM/YY
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: t('card.errors.cardExpiryInvalid', 'Use MM/YY format'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('card.cardExpiry.label', 'Expiry date (MM/YY)')}
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
              required: t('card.errors.cardCvvRequired', 'CVV is required'),
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: t('card.errors.cardCvvInvalid', 'Invalid CVV'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('card.cardCvv.label', 'CVV')}
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
