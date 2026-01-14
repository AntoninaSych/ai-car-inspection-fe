import { useMemo, useState } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTranslation } from 'react-i18next';
import { Alert, Stack, Typography, Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestPasswordReset } from '../../api/authApi';
import { EmailField } from '../FormFields';
import { SubmitButton } from '../SubmitButton';
import { createSchema } from './validation/schema';
import { errorHandler } from '../../utils/notification';
import { defaultValues } from './config';

export const ForgotPasswordForm = () => {
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
    <Box maxWidth="sm" sx={{ width: '100%' }}>
      {!isSuccess ? (
        <Stack spacing={2.5}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                <EmailField
                  name="email"
                  placeholder={t('common:fields.email.placeholder')}
                  label={t('common:fields.email.label')}
                  required
                />

                <SubmitButton endIcon={<TelegramIcon />} variant="gradient" disabled={!canSubmit}>
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
    </Box>
  );
};
