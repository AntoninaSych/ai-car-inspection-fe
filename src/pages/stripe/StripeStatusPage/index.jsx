import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StripeStatus } from '../../../features';

const StripeStatusPage = () => {
  const { t } = useTranslation('payment');

  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center">
          {t('stripe.paymentStatus.title')}
        </Typography>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>
          <StripeStatus />
        </Box>
      </Container>
    </>
  );
};

export default StripeStatusPage;
