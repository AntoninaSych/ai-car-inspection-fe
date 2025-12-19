import { Typography } from '@mui/material';

export const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <Typography
      variant="body2"
      sx={{
        color: '#90A1B9',
        fontSize: 12,
      }}
    >
      &copy; {year}, Car RepAIr Estimator. All rights reserved
    </Typography>
  );
};
