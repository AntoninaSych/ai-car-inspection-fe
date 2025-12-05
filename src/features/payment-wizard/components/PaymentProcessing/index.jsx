import { Box, Typography, LinearProgress, CardContent } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { StyledCard } from '../../styled';

export const PaymentProcessing = ({ t }) => {
  return (
    <StyledCard elevation={3} variant="outlined">
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CreditCardIcon sx={{ fontSize: 48 }} color="primary" />

          <Typography variant="h6">{t('payment.processing.title', 'Обробляємо оплату…')}</Typography>

          <Typography variant="body2" color="text.secondary">
            {t(
              'payment.processing.description',
              'Це може зайняти кілька секунд. Будь ласка, не закривайте сторінку та не оновлюйте її.'
            )}
          </Typography>

          <Box sx={{ width: '100%', mt: 3 }}>
            <LinearProgress />
          </Box>

          <Typography variant="caption" color="text.secondary">
            {t('payment.processing.helper', 'Ми перевіряємо платіж та готуємо вашу оцінку ремонту.')}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};
