import { useState } from 'react';
import { Container, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import { createStripeCheckoutSession } from '../../api/stripeApi';

const StripeTestPage = () => {
  const [fakeId, setFakeId] = useState('demo-123');
  const [amount, setAmount] = useState(2000);
  const [currency, setCurrency] = useState('gbp');
  const [error, setError] = useState('');

  const onPay = async () => {
    try {
      setError('');

      const res = await createStripeCheckoutSession({
        fake_id: fakeId,
        amount: Number(amount),
        currency: currency,
      });

      if (!res?.url) {
        setError('Stripe did not return checkout url');
        return;
      }

      window.location.href = res.url;
    } catch (e) {
      setError(e?.message || 'Failed to create checkout session');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h1" align="center" sx={{ mb: 3 }}>
        Stripe Test
      </Typography>

      <Stack spacing={2}>
        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField label="Fake ID" value={fakeId} onChange={e => setFakeId(e.target.value)} fullWidth />

        <TextField
          label="Amount (minor units)"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          helperText="Example: 2000 = 20.00"
          fullWidth
        />

        <TextField
          label="Currency"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          helperText="Example: gbp, usd, eur"
          fullWidth
        />

        <Button variant="contained" size="large" onClick={onPay}>
          Pay with card (Stripe Checkout)
        </Button>

        <Alert severity="info">Use Stripe test card: 4242 4242 4242 4242, любой будущий срок, любой CVC.</Alert>
      </Stack>
    </Container>
  );
};

export default StripeTestPage;
