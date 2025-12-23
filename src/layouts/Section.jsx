import { Box } from '@mui/material';
import { PageContainer } from './PageContainer';

export const Section = ({ container = true, children, containerProps = {}, py = { xs: 6, md: 10 }, ...rest }) => {
  return (
    <Box component="section" {...rest} sx={{ py, ...rest.sx }}>
      {container ? <PageContainer {...containerProps}>{children}</PageContainer> : children}
    </Box>
  );
};
