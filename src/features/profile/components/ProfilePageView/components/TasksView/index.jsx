import { Box, Typography, Chip, AccordionSummary, AccordionDetails, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledAccordion } from '../../styled';
import { ReportsView } from '../ReportsView';

export const TasksView = ({ tasks }) => {
  const { t } = useTranslation(['profile', 'report']);

  return (
    <Stack spacing={2}>
      {tasks.map(task => {
        const taskReports = task.reports ?? [];
        const lastReport = taskReports.at(-1);
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

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
                    {!isPaid && (
                      <Button size="small" variant="text" component={RouterLink} to={`/tasks/pay/${task.id}`}>
                        {t('profile:button.pay', 'Go to payment')}
                      </Button>
                    )}
                    <Chip
                      icon={isPaid ? <CheckCircleOutlined /> : <ErrorOutline />}
                      label={isPaid ? t('report:paid', 'paid') : t('report:unpaid', 'unpaid')}
                      color={isPaid ? 'success' : 'warning'}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  {t('report:createdAt', { value: createdAt })}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {lastReport && (
                    <Button size="small" variant="outlined" component={RouterLink} to={`/reports/${lastReport.id}`}>
                      {t('profile:view-latest-report', 'View latest report')}
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
  );
};
