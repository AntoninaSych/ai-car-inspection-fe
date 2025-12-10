import { Container, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StripeCancelPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h1" align="center" sx={{ mb: 3 }}>
        Payment cancelled
      </Typography>

      <Stack spacing={2}>
        <Button component={RouterLink} to="/stripe-test" variant="contained">
          Back to Stripe Test
        </Button>
      </Stack>
    </Container>
  );
};

export default StripeCancelPage;
