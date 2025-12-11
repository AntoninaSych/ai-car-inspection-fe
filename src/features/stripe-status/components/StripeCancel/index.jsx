import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTERS } from '../../../../constants';

export const StripeCancel = ({ taskId }) => {
  const { t } = useTranslation('payment');

  return (
    <Box textAlign="center">
      <Typography variant="h4">{t('stripe.paymentCancel.title')}</Typography>
      <Typography variant="subtitle1" mt={1}>
        {t('stripe.paymentCancel.subtitle')}
      </Typography>
      <Typography mt={1}>{t('stripe.paymentCancel.body')}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3, width: '100%' }}>
        {taskId && (
          <Button variant="contained" fullWidth component={RouterLink} to={`${ROUTERS.SUCCESS_PAYMENT}/${taskId}`}>
            {t('button.tryToPayAgain')}
          </Button>
        )}
        <Button variant="contained" fullWidth component={RouterLink} to={ROUTERS.PROFILE}>
          {t('button.goToProfile')}
        </Button>
      </Box>
    </Box>
  );
};
