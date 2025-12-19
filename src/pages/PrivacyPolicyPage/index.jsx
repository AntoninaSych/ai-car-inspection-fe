import { Container, Typography } from '@mui/material';
import { PageContainer } from '@/layouts';

export const PrivacyPolicyPage = () => {
  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy Policy
        </Typography>
      </Container>
    </PageContainer>
  );
};
