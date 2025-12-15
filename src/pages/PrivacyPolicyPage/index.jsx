import { Container, Typography, Box } from '@mui/material';
import { PageContainer } from '@/layouts';

export const PrivacyPolicyPage = () => {
  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy Policy
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            1. Introduction
          </Typography>
          <Typography paragraph>
            Welcome to Car RepAIr Estimator. We respect your privacy and are committed to protecting your personal data.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            2. Data Collection
          </Typography>
          <Typography paragraph>
            We collect information that you provide directly to us, including when you create an account, upload images
            for car damage assessment, or contact our support team.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            3. Use of Data
          </Typography>
          <Typography paragraph>
            We use the collected data to provide and improve our AI-powered car damage estimation services, process your
            requests, and communicate with you about our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            4. Data Security
          </Typography>
          <Typography paragraph>
            We implement appropriate technical and organizational measures to protect your personal data against
            unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            5. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this Privacy Policy, please contact us at privacy@carrepair.ai
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};
