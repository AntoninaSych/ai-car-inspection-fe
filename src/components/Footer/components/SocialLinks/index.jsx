import { Box, IconButton } from '@mui/material';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
  { icon: FaLinkedinIn, url: 'https://www.linkedin.com/company/ai-car-repair-estimatator/', label: 'LinkedIn' },
  { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
];

export const SocialLinks = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      {socialLinks.map(({ icon: Icon, url, label }) => (
        <IconButton
          key={label}
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.7)',
            backgroundColor: 'transparent',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#155DFC',
              borderColor: '#155DFC',
              color: 'white',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Icon size={18} />
        </IconButton>
      ))}
    </Box>
  );
};
