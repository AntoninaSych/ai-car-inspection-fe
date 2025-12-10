import { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Alert, Stack, Button } from '@mui/material';
import { getStripeCheckoutSession } from '../../api/stripeApi';

const StripeSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';

  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setError('');
        if (!sessionId) return;

        const res = await getStripeCheckoutSession(sessionId);
        setData(res);
      } catch (e) {
        setError(e?.message || 'Failed to fetch session');
      }
    };

    run();
  }, [sessionId]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h1" align="center" sx={{ mb: 3 }}>
        Payment success
      </Typography>

      <Stack spacing={2}>
        {!sessionId ? <Alert severity="warning">No session_id in URL</Alert> : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        {data?.session ? (
          <Alert severity={data.session.paymentStatus === 'paid' ? 'success' : 'info'}>
            Session: {data.session.id}
            <br />
            Status: {data.session.paymentStatus}
            <br />
            Amount: {data.session.amountTotal} {String(data.session.currency).toUpperCase()}
            <br />
            Reference: {data.session.clientReferenceId}
          </Alert>
        ) : null}

        <Button component={RouterLink} to="/stripe-test" variant="outlined">
          Back to Stripe Test
        </Button>
      </Stack>
    </Container>
  );
};

export default StripeSuccessPage;
