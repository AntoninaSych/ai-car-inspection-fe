import { Fragment } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ReportsView = ({ reports = [] }) => {
  const { t } = useTranslation('report');

  if (!reports.length) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary">
          {t('report:no-reports', 'There are no reports yet.')}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {reports.map(report => (
        <Box key={report.id}>
          <RouterLink to={`/reports/${report.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2">{report.data.analysis.summary}</Typography>
          </RouterLink>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {t('report:reportFrom', { value: new Date(report.createdAt).toLocaleString() })}
          </Typography>
        </Box>
      ))}
      <Stack spacing={2} direction="row" sx={{ mt: 1 }}>
        {reports.map(report => (
          <Fragment key={report.id}>
            {report.data.analysis.estimatedTotalLaborCost && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('report:totalLabor', 'Labor')}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {report.data.analysis.estimatedTotalLaborCost}
                </Typography>
              </Box>
            )}

            {report.data.analysis.estimatedTotalPartsCostOriginal && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('report:totalPartsOriginal', 'Parts (original)')}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {report.data.analysis.estimatedTotalPartsCostOriginal}
                </Typography>
              </Box>
            )}

            {report.data.analysis.estimatedTotalPartsCostAlternative && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('report:totalPartsAlternative', 'Parts (alternative)')}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {report.data.analysis.estimatedTotalPartsCostAlternative}
                </Typography>
              </Box>
            )}
          </Fragment>
        ))}
      </Stack>
    </>
  );
};
