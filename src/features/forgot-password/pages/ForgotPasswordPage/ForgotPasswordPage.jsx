import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Stack, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestPasswordReset } from '../../api/authApi';
import { EmailField, SubmitButton } from '../../../../components';
import { createSchema } from './validation/schema';
import { errorHandler } from '../../../../utils/notification';
import { defaultValues } from './config';
import { PageShell } from './components';

const ForgotPasswordPage = () => {
  const { t } = useTranslation('auth');
  const [isSuccess, setIsSuccess] = useState(false);
  const validationSchema = useMemo(() => createSchema(t), [t]);

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

  const onSubmit = async values => {
    try {
      // TODO [backend] must add rateLimit (internalCode, 429 status) for numbers of requests per a day to reset password (3 per a day ?)
      await requestPasswordReset({ email: values.email });
      setIsSuccess(true);
    } catch (error) {
      errorHandler(error, t('forgotPassword.errors.generic'));
    }
  };

  return (
    <PageShell>
      {!isSuccess ? (
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography variant="h4">{t('forgotPassword.request.title')}</Typography>
            <Typography variant="body1" color="text.secondary">
              {t('forgotPassword.request.subtitle')}
            </Typography>
          </Stack>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                <EmailField
                  name="email"
                  placeholder={t('common:fields.email.placeholder')}
                  label={t('common:fields.email.label')}
                  required
                />

                <SubmitButton variant="gradient" disabled={!canSubmit}>
                  {t('forgotPassword.request.submit')}
                </SubmitButton>
              </Stack>
            </form>
          </FormProvider>
        </Stack>
      ) : (
        <Stack spacing={2.5}>
          <Typography variant="h4">{t('forgotPassword.request.successTitle')}</Typography>

          <Alert severity="success">
            <Typography variant="body1">{t('forgotPassword.request.successBody')}</Typography>
          </Alert>

          <Typography variant="body2" color="text.secondary">
            {t('forgotPassword.request.help')}
          </Typography>
        </Stack>
      )}
    </PageShell>
  );
};

export default ForgotPasswordPage;
