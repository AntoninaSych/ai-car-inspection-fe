import { Container, Typography, Box, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/layouts';

export const TermsPage = () => {
  const { t } = useTranslation('terms');

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          {t('title')}
        </Typography>

        {/* 1. Service Definition and Disclaimer */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.serviceDefinition.title')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.serviceDefinition.content.point1')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.serviceDefinition.content.point2.intro')}
          </Typography>

          <List sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
            {t('sections.serviceDefinition.content.point2.items', { returnObjects: true }).map((item, index) => (
              <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="body1" paragraph>
            {t('sections.serviceDefinition.content.point3')}
          </Typography>
        </Box>

        {/* 2. User Content License */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.userContentLicense.title')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.userContentLicense.content.point1')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.userContentLicense.content.point2.intro')}
          </Typography>

          <List sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
            {t('sections.userContentLicense.content.point2.items', { returnObjects: true }).map((item, index) => (
              <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="body1" paragraph>
            {t('sections.userContentLicense.content.point3')}
          </Typography>
        </Box>

        {/* 3. Payment and Right of Withdrawal */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.payment.title')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.payment.content.point1')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.payment.content.point2')}
          </Typography>
        </Box>

        {/* 4. Limitation of Liability */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.liability.title')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.liability.content.point1')}
          </Typography>

          <Typography variant="body1" paragraph>
            {t('sections.liability.content.point2')}
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};
