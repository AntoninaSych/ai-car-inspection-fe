import { Container, Typography, Box, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/layouts';

export const CookiePolicyPage = () => {
  const { t } = useTranslation('cookiePolicy');

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          {t('title')}
        </Typography>

        {/* 1. What are cookies */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.whatAreCookies.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.whatAreCookies.content')}
          </Typography>
        </Box>

        {/* 2. Types of cookies */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.typesOfCookies.title')}
          </Typography>

          <List sx={{ pl: 2 }}>
            {/* Strictly Necessary */}
            <ListItem sx={{ display: 'block', py: 1.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {t('sections.typesOfCookies.strictly.title')}
              </Typography>
              <Typography variant="body1">{t('sections.typesOfCookies.strictly.description')}</Typography>
            </ListItem>

            {/* Analytical */}
            <ListItem sx={{ display: 'block', py: 1.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {t('sections.typesOfCookies.analytical.title')}
              </Typography>
              <Typography variant="body1">{t('sections.typesOfCookies.analytical.description')}</Typography>
            </ListItem>

            {/* Marketing */}
            <ListItem sx={{ display: 'block', py: 1.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {t('sections.typesOfCookies.marketing.title')}
              </Typography>
              <Typography variant="body1">{t('sections.typesOfCookies.marketing.description')}</Typography>
            </ListItem>
          </List>
        </Box>

        {/* 3. Consent Management */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {t('sections.consentManagement.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('sections.consentManagement.content')}
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default CookiePolicyPage;
