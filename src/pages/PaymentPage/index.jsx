import { Container, Typography, Box } from '@mui/material';
import { PaymentWizard } from '../../features';
import { useTranslation } from 'react-i18next';

const PaymentPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h1" align="center">
        {t('payment-page.title')}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <PaymentWizard />
      </Box>
    </Container>
  );
};

export default PaymentPage;
