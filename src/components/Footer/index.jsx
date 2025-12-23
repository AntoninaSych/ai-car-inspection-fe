import { Box, Grid, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Copyright, SocialLinks } from './components';
import { Brand } from '../Brand';
import { PageContainer } from '../../layouts';
import { footerLinks } from './config/footerLinks';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ backgroundColor: theme => theme.palette.neutral[900], color: 'white', py: 6 }}>
      <PageContainer>
        <Grid container spacing={{ xs: 1, md: 3 }} justifyContent="space-between">
          {/* Brand & Description */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack direction="column" gap={2} sx={{ mb: { xs: 4, lg: 0 } }}>
              <Brand light />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: { xs: '100%', md: 300 } }}>
                {t('footer.description')}
              </Typography>
            </Stack>
          </Grid>

          {/* Footer Links Columns */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={{ xs: 4, lg: 2 }}>
              {footerLinks.map(section => (
                <Grid key={section.title} size={{ xs: 12, md: 4 }}>
                  <Stack gap={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 14, color: 'white' }}>
                      {t(section.title)}
                    </Typography>
                    <Stack spacing={1}>
                      {section.links.map(link => (
                        <MuiLink
                          underline="hover"
                          key={link.labelKey}
                          component={link.href.startsWith('/#') ? 'a' : Link}
                          to={link.href.startsWith('/#') ? undefined : link.href}
                          href={link.href.startsWith('/#') ? link.href : undefined}
                          sx={{
                            color: '#CAD5E2',
                            textDecoration: 'none',
                            fontSize: 12,
                            transition: 'color 0.2s',
                            '&:hover': {
                              color: 'white',
                            },
                          }}
                        >
                          {t(link.labelKey)}
                        </MuiLink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: theme => `5px solid ${theme.palette.divider}`, my: 4 }} />

        {/* Bottom Section: Copyright & Social Links */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Copyright />
          <SocialLinks />
        </Stack>
      </PageContainer>
    </Box>
  );
};
