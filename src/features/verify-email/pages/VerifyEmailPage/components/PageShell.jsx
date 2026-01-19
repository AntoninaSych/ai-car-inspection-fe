import { Box, Card, CardContent } from '@mui/material';
import { PageContainer } from '../../../../../layouts';
import { Header } from './Header';

export const PageShell = ({ children }) => (
  <PageContainer sx={{ py: 8 }}>
    <Header />
    <Box maxWidth="sm" sx={{ mt: 4, marginLeft: 'auto', marginRight: 'auto' }}>
      <Card>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>{children}</CardContent>
      </Card>
    </Box>
  </PageContainer>
);
