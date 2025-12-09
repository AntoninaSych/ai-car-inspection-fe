import { useParams } from 'react-router-dom';
import { Container, Typography, Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useReportDetails } from './hook/useReportDetails';
import { Loader } from '../../components';
import { Report } from './components';

export const ReportDetails = () => {
  const { reportId } = useParams();
  const { t } = useTranslation('report');
  const { data, isLoading, error } = useReportDetails(reportId);

  if (isLoading) {
    return <Loader />;
  }

  if (!reportId) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" mt={4}>
          {t('noReportId', 'Report not found')}
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('serverError', 'An error occurred. Please try again later.')}</AlertTitle>
      </Alert>
    );
  }

  return <Report t={t} report={data.report?.data?.analysis} />;
};
