import { Typography } from '@mui/material';

export const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <Typography
      variant="body2"
      sx={{
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      &copy; {year}, Car RepAIr Estimator. All rights reserved
    </Typography>
  );
};
