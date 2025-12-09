import { Container, Box, Typography } from '@mui/material';
import { ReportDetails } from '../../features';
import { useTranslation } from 'react-i18next';

const ReportDetailsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center">
          {t('report-details-page.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {t('report-details-page.subtitle')}
        </Typography>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>
          <ReportDetails />
        </Box>
      </Container>
    </>
  );
};

export default ReportDetailsPage;
