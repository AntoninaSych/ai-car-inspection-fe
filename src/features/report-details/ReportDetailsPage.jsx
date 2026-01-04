import { Box } from '@mui/material';
import { ReportDetails } from './ReportDetails';
import { ReportHeader } from './components';
import { PageContainer } from '../../layouts';

const ReportDetailsPage = () => {
  return (
    <PageContainer sx={{ py: 8 }}>
      <ReportHeader />
      <Box sx={{ mt: 4 }}>
        <ReportDetails />
      </Box>
    </PageContainer>
  );
};

export default ReportDetailsPage;
