import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { formatCurrency } from '../../../../utils/formatCurrency';

export const CostItem = ({ label, value, currency }) => {
  const { i18n } = useTranslation();

  if (value == null || !value) {
    return null;
  }

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{formatCurrency(value, currency, i18n.language)}</Typography>
    </Grid>
  );
};
