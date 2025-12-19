import { Box, Grid, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Copyright, SocialLinks } from './components';
import { Brand } from '../Brand';
import { PageContainer } from '../../layouts';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'F.A.Q', href: '/#faq' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'API Access', href: '/api' },
      { label: 'Mobile App', href: '/app' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  },
];

export const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: theme => theme.palette.neutral[900], color: 'white', py: 6 }}>
      <PageContainer>
        <Grid container spacing={{ xs: 1, md: 3 }} justifyContent="space-between">
          {/* Brand & Description */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack direction="column" gap={2} sx={{ mb: { xs: 4, lg: 0 } }}>
              <Brand light />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: { xs: '100%', md: 300 } }}>
                AI-powered car repair cost estimation. Fast, accurate, and reliable.
              </Typography>
            </Stack>
          </Grid>

          {/* Footer Links Columns */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={{ xs: 4, lg: 2 }}>
              {footerSections.map(section => (
                <Grid key={section.title} size={{ xs: 12, md: 4 }}>
                  <Stack gap={2}>
                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 14, color: 'white' }}>
                      {section.title}
                    </Typography>
                    <Stack spacing={1}>
                      {section.links.map(link => (
                        <MuiLink
                          key={link.label}
                          component={link.href.startsWith('/#') ? 'a' : Link}
                          to={link.href.startsWith('/#') ? undefined : link.href}
                          href={link.href.startsWith('/#') ? link.href : undefined}
                          sx={{
                            color: '#CAD5E2',
                            textDecoration: 'none',
                            fontSize: 12,
                            transition: 'color 0.2s',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': {
                              color: 'white',
                            },
                          }}
                        >
                          {link.label}
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
