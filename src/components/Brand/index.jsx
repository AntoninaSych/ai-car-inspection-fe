import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../../constants';
import brandLogo1x from '@/assets/brand/logo.png';
import brandLogo2x from '@/assets/brand/logo@2x.png';

export const Brand = ({ light }) => {
  return (
    <Box
      component={Link}
      to={ROUTERS.HOME}
      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', textDecoration: 'none' }}
    >
      <Box
        component="img"
        alt="logo"
        src={brandLogo1x}
        srcSet={`${brandLogo1x} 1x, ${brandLogo2x} 2x`}
        sx={{
          width: '40px',
          height: '40px',
          display: 'block',
          background: '#FFFFFF',
          border: 'none',
        }}
      />
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: -0.4,
            fontSize: { xs: 14, md: 16 },
            lineHeight: 1.5,
            color: light ? '#FFFFFF' : '#0F172B',
          }}
        >
          Car Rep<span style={{ color: '#155DFC' }}>AI</span>r
        </Typography>

        <Typography
          sx={{
            mt: 0.2,
            fontSize: { xs: 10, md: 12 },
            lineHeight: 1,
            color: light ? 'rgba(255, 255, 255, 0.7)' : '#45556C',
          }}
        >
          Estimator
        </Typography>
      </Box>
    </Box>
  );
};
