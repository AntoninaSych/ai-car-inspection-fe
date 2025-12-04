import { Typography } from '@mui/material';

export const PaymentContent = ({ t }) => {
  return (
    <Typography variant="body1" color="text.secondary">
      {t(
        'success-page.paymentSuccess',
        'Payment has been successfully received. Please wait for an email with details of the assessment and next steps.'
      )}
    </Typography>
  );
};
