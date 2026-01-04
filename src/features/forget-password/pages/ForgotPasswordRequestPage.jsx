import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { requestPasswordReset } from '../api/authApi';

const createSchema = t =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(t('auth:forgotPassword.errors.required'))
      .email(t('auth:forgotPassword.errors.invalidEmail')),
  });

const PageShell = ({ children }) => (
  <Box sx={{ minHeight: 'calc(100vh - 64px)', py: { xs: 4, md: 8 } }}>
    <Container maxWidth="sm">
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>{children}</CardContent>
      </Card>
    </Container>
  </Box>
);

const ForgotPasswordRequestPage = () => {
  const { t } = useTranslation();
  const schema = useMemo(() => createSchema(t), [t]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  const onSubmit = async values => {
    setSubmitError('');
    try {
      await requestPasswordReset({ email: values.email });
      // Не розкриваємо чи існує email — завжди success UI
      setIsSuccess(true);
    } catch (e) {
      // Якщо бек поверне 429 (ліміт) — покажемо окремо
      const status = e?.response?.status;
      if (status === 429) {
        setSubmitError(t('auth:forgotPassword.errors.rateLimit'));
      } else {
        // Навіть тут можна теж робити success, але ти хотів ліміти — тоді лишаємо помилку
        setSubmitError(t('auth:forgotPassword.errors.generic'));
      }
    }
  };

  return (
    <PageShell>
      {!isSuccess ? (
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              {t('auth:forgotPassword.request.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('auth:forgotPassword.request.subtitle')}
            </Typography>
          </Stack>

          {submitError ? <Alert severity="error">{submitError}</Alert> : null}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <TextField
                label={t('auth:forgotPassword.request.emailLabel')}
                type="email"
                autoComplete="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message || ' '}
                {...register('email')}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
                sx={{ height: 48 }}
              >
                {t('auth:forgotPassword.request.submit')}
              </Button>

              <Stack direction="row" justifyContent="center">
                <Link component={RouterLink} to="/signin" underline="hover">
                  {t('auth:forgotPassword.request.backToSignIn')}
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Stack spacing={2.5}>
          <Typography variant="h4" fontWeight={700}>
            {t('auth:forgotPassword.request.successTitle')}
          </Typography>

          <Alert severity="success">
            <Typography variant="body1">{t('auth:forgotPassword.request.successBody')}</Typography>
          </Alert>

          <Typography variant="body2" color="text.secondary">
            {t('auth:forgotPassword.request.help')}
          </Typography>

          <Button component={RouterLink} to="/signin" variant="outlined" size="large" sx={{ height: 48 }}>
            {t('auth:forgotPassword.request.backToSignIn')}
          </Button>
        </Stack>
      )}
    </PageShell>
  );
};

export default ForgotPasswordRequestPage;
