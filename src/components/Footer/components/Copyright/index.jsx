import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Copyright = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <Typography
      variant="body2"
      sx={{
        color: '#90A1B9',
        fontSize: 12,
      }}
    >
      &copy; {year}, Car RepAIr Estimator. {t('footer.copyright')}
    </Typography>
  );
};
