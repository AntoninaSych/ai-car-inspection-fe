import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ReportHeader = () => {
  const { t } = useTranslation('report');

  return (
    <>
      <Typography variant="h1" align="center">
        {t('title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        {t('subtitle')}
      </Typography>
    </>
  );
};
