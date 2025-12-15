import { Container, Typography, Box } from '@mui/material';
import { PageContainer } from '@/layouts';

export const TermsPage = () => {
  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Terms & Conditions
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph>
            By accessing and using Car RepAIr Estimator, you accept and agree to be bound by the terms and provision of
            this agreement.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            2. Service Description
          </Typography>
          <Typography paragraph>
            Car RepAIr Estimator provides AI-powered car damage assessment and repair cost estimation services. The
            estimates provided are for informational purposes and may vary from actual repair costs.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            3. User Obligations
          </Typography>
          <Typography paragraph>
            Users must provide accurate information and images for assessment. You are responsible for maintaining the
            confidentiality of your account credentials.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            4. Limitation of Liability
          </Typography>
          <Typography paragraph>
            We strive for accuracy but do not guarantee that our estimates will match actual repair costs. We are not
            liable for any decisions made based on our estimates.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            5. Changes to Terms
          </Typography>
          <Typography paragraph>
            We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance
            of modified terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            6. Contact Information
          </Typography>
          <Typography paragraph>
            For questions about these Terms & Conditions, contact us at support@carrepair.ai
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};
