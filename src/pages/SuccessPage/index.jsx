import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PaymentContent, BasicContent } from './components';

const SuccessPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isFromPayment = location.state?.from === 'payment';

  const renderContent = () => {
    if (isFromPayment) {
      return <PaymentContent t={t} />;
    }
    return <BasicContent t={t} />;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" mt={6} gutterBottom>
        {t('success-page:title', 'Thank you!')}
      </Typography>
      <Box sx={{ mt: 4 }}>{renderContent()}</Box>
    </Container>
  );
};

export default SuccessPage;
