import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTERS } from '../../../constants';

const StripeCancelPage = () => {
  const { t } = useTranslation('payment');

  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center">
          {t('stripe.paymentCancel.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {t('stripe.paymentCancel.subtitle')}
        </Typography>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography mt={3}>{t('stripe.paymentCancel.body')}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2, width: '100%' }}>
            <Button variant="text" fullWidth component={RouterLink} to={ROUTERS.PROFILE}>
              {t('button.goToProfile')}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default StripeCancelPage;
