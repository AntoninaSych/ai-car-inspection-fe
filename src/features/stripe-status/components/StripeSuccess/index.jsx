import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTERS } from '../../../../constants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const StripeSuccess = () => {
  const { t } = useTranslation('payment');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 64 }} color="success" />
      <Box>
        <Typography variant="h4">{t('stripe.paymentSuccess.title')}</Typography>
        <Typography variant="subtitle1" mt={1}>
          {t('stripe.paymentSuccess.subtitle')}
        </Typography>

        <Typography mt={3}>{t('stripe.paymentSuccess.body')}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2, width: '100%' }}>
          <Button variant="contained" fullWidth component={RouterLink} to={ROUTERS.PROFILE}>
            {t('button.goToProfile')}
          </Button>

          <Button variant="text" fullWidth component={RouterLink} to={ROUTERS.HOME}>
            {t('button.backToHome')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
