import { Box } from '@mui/material';
import { DashboardHeader } from './components/DashboardHeader';
import { PageContainer } from '../../layouts';
import { Dashboard } from './Dashboard';

const DashboardPage = () => {
  return (
    <PageContainer sx={{ py: 8 }}>
      <DashboardHeader />
      <Box sx={{ mt: 4 }}>
        <Dashboard />
      </Box>
    </PageContainer>
  );
};

export default DashboardPage;
