import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation('auth');
  return (
    <Box textAlign="center">
      <Typography variant="h1">{t('forgotPassword.reset.header.title')}</Typography>
      <Typography component="h2" color="text.secondary">
        {t('forgotPassword.reset.header.subtitle')}
      </Typography>
    </Box>
  );
};
