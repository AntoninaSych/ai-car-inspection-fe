import { Box, Stack, Container, Typography } from '@mui/material';
import { Button } from '../../../../design-system/components';
import { ROUTERS } from '../../../../constants';

const Hero = () => {
  return (
    <Box component="section" sx={{ backgroundColor: theme => theme.palette.background.secondary }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h1">AI Car Repair Estimator</Typography>
          <Typography>
            Upload a photo of the damage — AI will identify the elements, damage, and the estimated repair price.
          </Typography>
        </Stack>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button to={ROUTERS.UPLOAD}>Upload Photo</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
