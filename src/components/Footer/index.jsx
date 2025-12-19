import { Container, Box, Grid, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Copyright, SocialLinks } from './components';
import { Brand } from '../Brand';

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
    <Box component="footer" sx={{ backgroundColor: '#0F172B', color: 'white', py: 8, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="space-between">
          {/* Brand & Description */}
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <Brand light={true} />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, maxWidth: 300, display: { xs: 'none', md: 'block' } }}
            >
              AI-powered car repair cost estimation. Fast, accurate, and reliable.
            </Typography>
          </Grid>

          {/* Footer Links Columns */}
          <Grid
            item
            xs={12}
            md={9}
            sx={{ display: { xs: 'flex', md: 'contents' }, gap: { xs: 2, sm: 4 }, justifyContent: 'space-between' }}
          >
            {footerSections.map(section => (
              <Box key={section.title} sx={{ flex: { xs: 1, md: 'none' }, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2, fontSize: { xs: 14, md: 16 }, color: 'white' }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={1.5}>
                  {section.links.map(link => (
                    <MuiLink
                      key={link.label}
                      component={link.href.startsWith('/#') ? 'a' : Link}
                      to={link.href.startsWith('/#') ? undefined : link.href}
                      href={link.href.startsWith('/#') ? link.href : undefined}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontSize: { xs: 12, md: 14 },
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
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', my: 4 }} />

        {/* Bottom Section: Copyright & Social Links */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Copyright />
          <SocialLinks />
        </Stack>
      </Container>
    </Box>
  );
};
