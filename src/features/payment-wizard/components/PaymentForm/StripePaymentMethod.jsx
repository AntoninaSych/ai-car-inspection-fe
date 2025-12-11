import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const StripePaymentMethod = () => {
  const { t } = useTranslation('payment');

  return (
    <Box mt={2}>
      <Typography variant="h6" mb={1}>
        {t('stripe.title', 'Bank card details')}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {t('stripe.subtitle', 'Pay with card (Stripe Checkout).')}
      </Typography>
    </Box>
  );
};
