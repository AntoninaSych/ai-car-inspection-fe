import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
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

import { resetPassword, validateResetToken } from '../api/authApi';

const TOKEN_STATUS = {
  CHECKING: 'CHECKING',
  VALID: 'VALID',
  INVALID: 'INVALID',
  EXPIRED: 'EXPIRED',
  USED: 'USED',
  ERROR: 'ERROR',
};

const mapTokenResponseToStatus = resp => {
  if (!resp) return TOKEN_STATUS.ERROR;
  if (resp.valid) return TOKEN_STATUS.VALID;

  switch (resp.reason) {
    case 'used':
      return TOKEN_STATUS.USED;
    case 'expired':
      return TOKEN_STATUS.EXPIRED;
    case 'invalid':
    default:
      return TOKEN_STATUS.INVALID;
  }
};

const createSchema = t =>
  yup.object({
    password: yup
      .string()
      .required(t('auth:forgotPassword.errors.required'))
      .min(8, t('auth:forgotPassword.errors.passwordMin', { value: 8 })),
    confirmPassword: yup
      .string()
      .required(t('auth:forgotPassword.errors.required'))
      .oneOf([yup.ref('password')], t('auth:forgotPassword.errors.passwordMismatch')),
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

const TokenMessage = ({ title, body, t }) => (
  <Stack spacing={2.5}>
    <Typography variant="h4" fontWeight={700}>
      {title}
    </Typography>

    <Alert severity="warning">
      <Typography variant="body1">{body}</Typography>
    </Alert>

    <Button component={RouterLink} to="/forgot-password" variant="contained" size="large" sx={{ height: 48 }}>
      {t('auth:forgotPassword.token.requestNew')}
    </Button>

    <Stack direction="row" justifyContent="center">
      <Link component={RouterLink} to="/signin" underline="hover">
        {t('auth:forgotPassword.request.backToSignIn')}
      </Link>
    </Stack>
  </Stack>
);

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const schema = useMemo(() => createSchema(t), [t]);

  const [tokenStatus, setTokenStatus] = useState(TOKEN_STATUS.CHECKING);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!token) {
        setTokenStatus(TOKEN_STATUS.INVALID);
        return;
      }

      setTokenStatus(TOKEN_STATUS.CHECKING);

      try {
        const resp = await validateResetToken({ token });
        const status = mapTokenResponseToStatus(resp);
        if (isMounted) setTokenStatus(status);
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setTokenStatus(TOKEN_STATUS.ERROR);
        }
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const onSubmit = async values => {
    setSubmitError('');
    try {
      await resetPassword({ token, password: values.password });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitError(t('auth:forgotPassword.errors.generic'));
    }
  };

  if (isSuccess) {
    return (
      <PageShell>
        <Stack spacing={2.5}>
          <Typography variant="h4" fontWeight={700}>
            {t('auth:forgotPassword.reset.successTitle')}
          </Typography>

          <Alert severity="success">
            <Typography variant="body1">{t('auth:forgotPassword.reset.successBody')}</Typography>
          </Alert>

          <Button component={RouterLink} to="/signin" variant="contained" size="large" sx={{ height: 48 }}>
            {t('auth:forgotPassword.reset.goToSignIn')}
          </Button>
        </Stack>
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.CHECKING) {
    return (
      <PageShell>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="text.secondary">{t('auth:forgotPassword.token.checking')}</Typography>
        </Stack>
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.USED) {
    return (
      <PageShell>
        <TokenMessage
          title={t('auth:forgotPassword.token.usedTitle')}
          body={t('auth:forgotPassword.token.usedBody')}
          t={t}
        />
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.EXPIRED) {
    return (
      <PageShell>
        <TokenMessage
          title={t('auth:forgotPassword.token.expiredTitle')}
          body={t('auth:forgotPassword.token.expiredBody')}
          t={t}
        />
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.INVALID) {
    return (
      <PageShell>
        <TokenMessage
          title={t('auth:forgotPassword.token.invalidTitle')}
          body={t('auth:forgotPassword.token.invalidBody')}
          t={t}
        />
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.ERROR) {
    return (
      <PageShell>
        <TokenMessage
          title={t('auth:forgotPassword.errors.generic')}
          body={t('auth:forgotPassword.errors.generic')}
          t={t}
        />
      </PageShell>
    );
  }

  // VALID token -> show reset form
  return (
    <PageShell>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            {t('auth:forgotPassword.reset.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('auth:forgotPassword.reset.subtitle')}
          </Typography>
        </Stack>

        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label={t('auth:forgotPassword.reset.passwordLabel')}
              type="password"
              autoComplete="new-password"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message || ' '}
              {...register('password')}
            />

            <TextField
              label={t('auth:forgotPassword.reset.confirmPasswordLabel')}
              type="password"
              autoComplete="new-password"
              fullWidth
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message || ' '}
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
              sx={{ height: 48 }}
            >
              {t('auth:forgotPassword.reset.submit')}
            </Button>

            <Stack direction="row" justifyContent="center">
              <Link component={RouterLink} to="/signin" underline="hover">
                {t('auth:forgotPassword.request.backToSignIn')}
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </PageShell>
  );
};

export default ResetPasswordPage;
