import { Box, Container } from '@mui/material';

export const Hero = () => {
  return (
    <Box component="section" sx={{ backgroundColor: theme => theme.palette.background.secondary }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 2 }}>Coming soon...</Box>
      </Container>
    </Box>
  );
};
