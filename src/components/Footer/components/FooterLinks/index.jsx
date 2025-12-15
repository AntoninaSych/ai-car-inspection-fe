import { Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export const FooterLinks = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
      {footerLinks.map(({ label, href }) => (
        <MuiLink
          key={label}
          component={Link}
          to={href}
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: 14,
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          }}
        >
          {label}
        </MuiLink>
      ))}
    </Box>
  );
};
