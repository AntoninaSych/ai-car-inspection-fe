import { Box, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FILTERS } from './constants';

export const FilterPanel = ({ filter, onChange }) => {
  const { t } = useTranslation('profile');

  return (
    <Box>
      <Tabs value={filter} onChange={onChange} sx={{ mb: 2 }}>
        <Tab value={FILTERS.ALL} label={t('filter.tasks.all')} />
        <Tab value={FILTERS.PAID} label={t('filter.tasks.paid')} />
        <Tab value={FILTERS.UNPAID} label={t('filter.tasks.unpaid')} />
      </Tabs>
    </Box>
  );
};
