import { Box } from '@mui/material';

export const Copyright = () => {
  const year = new Date().getFullYear();
  return <Box sx={{ py: 4 }}>&copy; {year}, Car RepAIr Estimator. All rights reserved</Box>;
};
