import { useMemo, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EmptyState, FilterPanel, TasksView } from './components/';
import { FILTERS } from './constants';

export const ProfilePageView = ({ tasks, isLoading }) => {
  const { t } = useTranslation('profile');
  const [filter, setFilter] = useState(FILTERS.ALL);

  const handleChangeFilter = (_event, value) => {
    if (!value) return;
    setFilter(value);
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.PAID:
        return tasks.filter(task => task.isPaid);
      case FILTERS.UNPAID:
        return tasks.filter(task => !task.isPaid);
      case FILTERS.ALL:
      default:
        return tasks;
    }
  }, [tasks, filter]);

  if (isLoading) {
    return <Typography>{t('loading', 'Loading data...')}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('my-requests', 'My requests')}
      </Typography>

      <Stack spacing={2}>
        <FilterPanel filter={filter} onChange={handleChangeFilter} />
        {filteredTasks.length === 0 ? <EmptyState filter={filter} /> : <TasksView tasks={filteredTasks} />}
      </Stack>
    </Box>
  );
};
