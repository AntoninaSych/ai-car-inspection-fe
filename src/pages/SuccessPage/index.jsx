import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Payment } from './components';

const SuccessPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isFromPayment = location.state?.from === 'payment';

  const renderContent = () => {
    if (isFromPayment) {
      return <Payment t={t} />;
    }
    return null;
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center">
          {t('success-page.title', 'Thank you for using the service.')}
        </Typography>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>{renderContent()}</Box>
      </Container>
    </>
  );
};

export default SuccessPage;
