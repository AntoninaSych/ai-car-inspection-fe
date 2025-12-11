import { Box, CardContent, LinearProgress, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTranslation } from 'react-i18next';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PAYMENT_METHODS } from '../../constants';
import { StyledCard } from '../../styled';

export const PaymentProcessing = ({ uiState, paymentMethod }) => {
  const { t } = useTranslation('payment');
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
    <StyledCard variant="elevation">
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {renderIcon()}
          <Typography variant="h6">{t(`processing.title`, 'Processing your payment...')}</Typography>

          <Box sx={{ width: '100%', mt: 3 }}>
            <LinearProgress />
          </Box>

          <Typography variant="body2" color="text.secondary">
            {uiState === 'takingLonger' ? t('processing.takingLonger') : t('processing.description')}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};
