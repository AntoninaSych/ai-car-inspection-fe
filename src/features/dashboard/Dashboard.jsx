import { useState, useMemo } from 'react';
import { Box, useMediaQuery, Alert, AlertTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DashboardFilters } from './components/DashboardFilters';
import { EstimateList } from './components/EstimateList';
import { countByStatus, filterEstimates } from './utils/dashboardFilters';
import { StatsRow } from './components/StatsRow';
import { ROUTERS } from '../../constants';
import { useCurrentTasks } from './hook/useCurrentTasks';
import { Loader } from '../../components';
import { getEstimatedCostByTasks } from './utils/estimateCost';

export const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { tasks, isLoading, error } = useCurrentTasks();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const stats = useMemo(() => countByStatus(tasks), [tasks]);
  const filtered = useMemo(() => filterEstimates(tasks, { query, status }), [tasks, query, status]);
  const totalRevenue = useMemo(() => getEstimatedCostByTasks(tasks), [tasks]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('common:errors.unknown', 'An error occurred. Please try again later.')}</AlertTitle>
      </Alert>
    );
  }

  const handleOnViewDetails = reportId => {
    navigate(`${ROUTERS.REPORTS}/${reportId}`);
  };

  return (
    <>
      <Box>
        <StatsRow
          totalReports={stats.total}
          completed={stats.completed}
          processing={stats.processing}
          revenue={totalRevenue}
          t={t}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <DashboardFilters
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          counters={stats}
          t={t}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <EstimateList items={filtered} isMobile={isMobile} onViewDetails={handleOnViewDetails} t={t} />
      </Box>
    </>
  );
};
