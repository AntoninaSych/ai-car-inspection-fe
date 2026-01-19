import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resendVerification, verifyEmail } from '../../api/authApi';
import { createSchema } from './validation/schema';
import { EmailField, SubmitButton } from '../../../../components';
import { ROUTERS } from '../../../../constants';
import { defaultValues } from './config';
import { PageShell } from './components';
import { errorHandler } from '../../../../utils/notification';

const TOKEN_STATUS = {
  CHECKING: 'CHECKING',
  VERIFIED: 'VERIFIED',
  NOT_VERIFIED: 'NOT_VERIFIED',
  ERROR: 'ERROR',
  INVALID: 'INVALID',
};

const mapTokenResponseToStatus = response => {
  if (!response) {
    return TOKEN_STATUS.ERROR;
  }

  if (response.verified) {
    return TOKEN_STATUS.VERIFIED;
  }

  return TOKEN_STATUS.NOT_VERIFIED;
};

const TokenMessage = ({ title, body }) => (
  <Stack spacing={2.5}>
    <Typography variant="h4">{title}</Typography>

    <Alert severity="warning">
      <Typography variant="body1">{body}</Typography>
    </Alert>
  </Stack>
);

const VerifyEmailPage = () => {
  const { t } = useTranslation('auth');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const validationSchema = useMemo(() => createSchema(t), [t]);
  const [tokenStatus, setTokenStatus] = useState(TOKEN_STATUS.CHECKING);
  const [formSubmitted, setFormSubmitted] = useState(true);

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
        const response = await verifyEmail({ token });
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
      await resendVerification({ email: values.email });
      setFormSubmitted(true);
    } catch (error) {
      errorHandler(error, t('common:errors.generic'));
    }
  };

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

  if (tokenStatus === TOKEN_STATUS.ERROR) {
    return (
      <PageShell>
        <TokenMessage title={t('common:errors.generic')} body={t('common:errors.generic')} />
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

  if (tokenStatus === TOKEN_STATUS.VERIFIED) {
    return (
      <PageShell>
        <Stack spacing={2.5}>
          <Typography variant="h4">{t('verify.success.title')}</Typography>

          <Alert severity="success">
            <Typography variant="body1">{t('verify.success.text')}</Typography>
          </Alert>

          <Button component={RouterLink} to={ROUTERS.HOME} variant="contained" size="medium">
            {t('verify.success.button')}
          </Button>
        </Stack>
      </PageShell>
    );
  }

  if (formSubmitted) {
    return (
      <PageShell>
        <Stack spacing={2.5}>
          <Typography variant="h4">{t('verify.resendSuccess.title')}</Typography>

          <Alert severity="success">
            <Typography variant="body1">{t('verify.resendSuccess.text')}</Typography>
          </Alert>
        </Stack>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4">{t('verify.resend.title')}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t('verify.resend.subtitle')}
          </Typography>
        </Stack>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <EmailField
                name="email"
                placeholder={t('common:fields.email.placeholder')}
                label={t('common:fields.email.label')}
                required
              />

              <SubmitButton variant="gradient" loading={isSubmitting} disabled={!canSubmit}>
                {t('verify.resend.submit')}
              </SubmitButton>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </PageShell>
  );
};

export default VerifyEmailPage;
