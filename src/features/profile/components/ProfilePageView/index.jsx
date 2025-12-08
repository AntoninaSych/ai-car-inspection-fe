import { useMemo, useState } from 'react';
import { Box, Typography, Chip, AccordionSummary, AccordionDetails, Button, Stack, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Link as RouterLink } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { StyledAccordion } from './styled';
import { ReportsView } from '../ReportsView';
import { ROUTERS } from '../../../../constants';
import { FilterPanel } from './components/';
import { FILTERS } from './components/FilterPanel/constants';

export const ProfilePageView = ({ tasks, isLoading }) => {
  const { t } = useTranslation(['profile', 'report']);
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
    return <Typography>{t('profile:loading', 'Loading data...')}</Typography>;
  }

  if (!tasks?.length) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {t('report:my-requests', 'My requests')}
        </Typography>
        <Typography>
          <Trans i18nKey="report:no-requests">
            You have no requests yet -{' '}
            <Link component={RouterLink} to={ROUTERS.UPLOAD}>
              Create your first one
            </Link>
          </Trans>
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('report:my-requests', 'My requests')}
      </Typography>

      <Stack spacing={2}>
        <FilterPanel filter={filter} onChange={handleChangeFilter} />

        {filteredTasks.map(task => {
          const taskReports = task.reports ?? [];
          const lastReport = taskReports.length > 1 && taskReports.at(-1);
          const isPaid = task.isPaid;
          const createdAt = new Date(task.createdAt).toLocaleString();

          return (
            <StyledAccordion key={task.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                    <Typography variant="subtitle1">
                      {task.brand} {task.model} ({task.year})
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
                      <Chip
                        icon={isPaid ? <CheckCircleOutlined /> : <ErrorOutline />}
                        label={isPaid ? t('report:paid', 'paid') : t('report:unpaid', 'unpaid')}
                        color={isPaid ? 'success' : 'warning'}
                        size="small"
                      />
                    </Stack>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {t('report:createdAt', { value: createdAt })}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {!isPaid && (
                      <Button variant="contained" component={RouterLink} to={`/tasks/pay/${task.id}`}>
                        {t('report:button.pay', 'Go to payment')}
                      </Button>
                    )}

                    {lastReport && (
                      <Button variant="contained" component={RouterLink} to={`/reports/${lastReport.id}`}>
                        {t('report:view-latest-report', 'View latest report')}
                      </Button>
                    )}
                  </Stack>
                  <ReportsView reports={taskReports} />
                </Stack>
              </AccordionDetails>
            </StyledAccordion>
          );
        })}
      </Stack>
    </Box>
  );
};
