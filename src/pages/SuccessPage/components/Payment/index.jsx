import { Typography } from '@mui/material';

export const Payment = ({ t }) => {
  return (
    <>
      <Typography variant="h3" color="text.secondary" sx={{ mb: 3 }}>
        {t('success-page.payment.title', 'Thank you! We’ve received your payment information')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t(
          'success-page.payment.subtitle',
          'We have updated the status of your request. Please check your email for further updates. You can also visit your profile to view the status of all your submissions.'
        )}
      </Typography>
    </>
  );
};
