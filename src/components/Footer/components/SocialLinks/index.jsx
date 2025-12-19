import { Stack, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { socialLinks } from '../../config/socialLinks';

const SocialIcon = ({ icon, ...props }) => {
  switch (icon) {
    case 'facebook':
      return <FaFacebookF {...props} />;
    case 'twitter':
      return <FaTwitter {...props} />;
    case 'linkedin':
      return <FaLinkedinIn {...props} />;
    case 'instagram':
      return <FaInstagram {...props} />;
    default:
      return null;
  }
};

export const SocialLinks = () => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" gap={2}>
      {socialLinks.map(({ icon, href, labelKey }) => {
        const label = t(labelKey);
        return (
          <IconButton
            key={labelKey}
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              color: '#FFFFFF',
              backgroundColor: '#1D293D',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: theme => theme.palette.action.hover,
              },
              '&:active': {
                transform: 'translateY(1px)',
              },
            }}
          >
            <SocialIcon size={16} icon={icon} />
          </IconButton>
        );
      })}
    </Stack>
  );
};
