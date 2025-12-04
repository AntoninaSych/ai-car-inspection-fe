import { Typography } from '@mui/material';

export const BasicContent = ({ t }) => {
  return (
    <Typography variant="body1" color="text.secondary">
      {t('success-page.generic', 'Thank you for using the service. We will contact you by email soon.')}
    </Typography>
  );
};
