import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, CircularProgress, InputAdornment, Stack, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassword, validateResetToken } from '../../api/authApi';
import { createSchema, PASSWORD_MIN } from './validation/schema';
import { errorHandler } from '../../../../utils/notification';
import { InputField, SubmitButton } from '../../../../components';
import { ROUTERS } from '../../../../constants';
import { defaultValues } from './config';
import { PageShell } from './components';

const TOKEN_STATUS = {
  CHECKING: 'CHECKING',
  VALID: 'VALID',
  INVALID: 'INVALID',
  EXPIRED: 'EXPIRED',
  USED: 'USED',
  ERROR: 'ERROR',
};

const mapTokenResponseToStatus = response => {
  if (!response) {
    return TOKEN_STATUS.ERROR;
  }

  if (response.valid) {
    return TOKEN_STATUS.VALID;
  }

  switch (response.reason) {
    case 'used':
      return TOKEN_STATUS.USED;
    case 'expired':
      return TOKEN_STATUS.EXPIRED;
    case 'invalid':
    default:
      return TOKEN_STATUS.INVALID;
  }
};

const TokenMessage = ({ title, body, t }) => (
  <Stack spacing={2.5}>
    <Typography variant="h4">{title}</Typography>

    <Alert severity="warning">
      <Typography variant="body1">{body}</Typography>
    </Alert>

    <Button component={RouterLink} to={ROUTERS.FORGOT_PASSWORD} variant="contained" size="medium">
      {t('forgotPassword.token.requestNew')}
    </Button>
  </Stack>
);

const ResetPasswordPage = () => {
  const { t } = useTranslation('auth');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const validationSchema = useMemo(() => createSchema(t), [t]);
  const [tokenStatus, setTokenStatus] = useState(TOKEN_STATUS.CHECKING);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const canSubmit = !isSubmitting && isDirty;

  useEffect(() => {
    let isMounted = true;

    const checkToken = async () => {
      if (!token) {
        setTokenStatus(TOKEN_STATUS.INVALID);
        return;
      }

      setTokenStatus(TOKEN_STATUS.CHECKING);

      try {
        // TODO [backend] must add a check if a token is valid (response.valid or response.reason (used, expired, invalid)
        const response = await validateResetToken({ token });
        const status = mapTokenResponseToStatus(response);
        if (isMounted) {
          setTokenStatus(status);
        }
      } catch (_) {
        if (isMounted) {
          setTokenStatus(TOKEN_STATUS.ERROR);
        }
      }
    };

    checkToken();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const onSubmit = async values => {
    try {
      await resetPassword({ token, password: values.password });
      setIsSuccess(true);
    } catch (error) {
      errorHandler(error, t('forgotPassword.errors.generic'));
    }
  };

  if (isSuccess) {
    return (
      <PageShell>
        <Stack spacing={2.5}>
          <Typography variant="h4">{t('forgotPassword.reset.successTitle')}</Typography>

          <Alert severity="success">
            <Typography variant="body1">{t('forgotPassword.reset.successBody')}</Typography>
          </Alert>

          <Button component={RouterLink} to={ROUTERS.HOME} variant="contained" size="medium">
            {t('forgotPassword.reset.goToHome')}
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
          <Typography color="text.secondary">{t('forgotPassword.token.checking')}</Typography>
        </Stack>
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.USED) {
    return (
      <PageShell>
        <TokenMessage title={t('forgotPassword.token.usedTitle')} body={t('forgotPassword.token.usedBody')} t={t} />
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.EXPIRED) {
    return (
      <PageShell>
        <TokenMessage
          title={t('forgotPassword.token.expiredTitle')}
          body={t('forgotPassword.token.expiredBody')}
          t={t}
        />
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.INVALID) {
    return (
      <PageShell>
        <TokenMessage
          title={t('forgotPassword.token.invalidTitle')}
          body={t('forgotPassword.token.invalidBody')}
          t={t}
        />
      </PageShell>
    );
  }

  if (tokenStatus === TOKEN_STATUS.ERROR) {
    return (
      <PageShell>
        <TokenMessage title={t('forgotPassword.errors.generic')} body={t('forgotPassword.errors.generic')} t={t} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4">{t('forgotPassword.reset.title')}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t('forgotPassword.reset.subtitle')}
          </Typography>
        </Stack>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <InputField
                  name="password"
                  type="password"
                  label={t('forgotPassword.reset.passwordLabel')}
                  placeholder={t('common:validation.minString', { value: PASSWORD_MIN })}
                  startIcon={
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  }
                  required
                  showRules
                />
                <InputField
                  name="confirmPassword"
                  type="password"
                  label={t('forgotPassword.reset.confirmPasswordLabel')}
                  startIcon={
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  }
                  required
                />
              </Stack>

              <SubmitButton variant="gradient" loading={isSubmitting} disabled={!canSubmit}>
                {t('forgotPassword.reset.submit')}
              </SubmitButton>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </PageShell>
  );
};

export default ResetPasswordPage;
