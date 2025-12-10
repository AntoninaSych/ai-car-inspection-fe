import { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Alert, Stack, Button } from '@mui/material';
import { getStripeCheckoutSession } from '../../api/stripeApi';

const StripeSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';

  const [session, setSession] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setError('');
        if (!sessionId) return;

        setLoading(true);

        const res = await getStripeCheckoutSession(sessionId);
        setSession(res?.session || null);
      } catch (e) {
        const backendMessage = e?.response?.data?.message;
        const status = e?.response?.status;
        setError(
          backendMessage
            ? `${backendMessage}`
            : status
              ? `Request failed with status ${status}`
              : e?.message || 'Failed to load Stripe session'
        );
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [sessionId]);

  const taskId = session?.metadata?.task_id || session?.client_reference_id;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h1" align="center" sx={{ mb: 3 }}>
        Payment success
      </Typography>

      <Stack spacing={2}>
        {!sessionId ? <Alert severity="warning">No session_id in URL</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}
        {loading ? <Alert severity="info">Loading payment info...</Alert> : null}

        <Alert severity="success">
          Payment received ✅<br />
          Backend will mark the task as paid via Stripe webhook.
        </Alert>

        {session ? (
          <Alert severity={session.payment_status === 'paid' ? 'success' : 'info'}>
            <div>Stripe session: {session.id}</div>
            <div>Stripe status: {session.payment_status}</div>
            <div>
              Amount: {session.amount_total} {String(session.currency || '').toUpperCase()}
            </div>
            <div>Task ID: {taskId || '—'}</div>
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
