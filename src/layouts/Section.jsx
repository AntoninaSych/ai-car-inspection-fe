import { Box } from '@mui/material';
import { PageContainer } from './PageContainer';

export const Section = ({ container = true, children, py = { xs: 6, md: 10 }, ...rest }) => {
  return (
    <Box component="section" {...rest} sx={{ py, ...rest.sx }}>
      {container ? <PageContainer>{children}</PageContainer> : children}
    </Box>
  );
};
