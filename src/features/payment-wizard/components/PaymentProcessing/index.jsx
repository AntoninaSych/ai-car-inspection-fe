import { Box, CardContent, LinearProgress, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PAYMENT_METHODS } from '../../constants';
import { StyledCard } from '../../styled';

export const PaymentProcessing = ({ t, paymentMethod }) => {
  if (!paymentMethod) {
    return null;
  }

  const renderIcon = () => {
    if (paymentMethod === PAYMENT_METHODS.TRANSFER) {
      return <SwapHorizIcon sx={{ fontSize: 48 }} color="primary" />;
    }
    return <CreditCardIcon sx={{ fontSize: 48 }} color="primary" />;
  };

  return (
    <StyledCard elevation={3} variant="outlined">
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {renderIcon()}
          <Typography variant="h6">{t(`payment:processing.title`, 'Processing your payment...')}</Typography>

          <Box sx={{ width: '100%', mt: 3 }}>
            <LinearProgress />
          </Box>

          <Typography variant="body2" color="text.secondary">
            {t(
              'payment:processing.description',
              'This may take a few seconds. Please do not close or refresh the page.'
            )}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};
