import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { InputAdornment, Stack, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../../redux/auth/operations';
import { errorHandler } from '../../utils/notification';
import { defaultValues } from './config';
import { createValidationSchema } from './validation/schema';
import { EmailField, InputField } from '../FormFields';
import { SubmitButton } from '../SubmitButton';
import { Wrapper } from './styled';

export const LoginForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = useMemo(() => createValidationSchema(t), [t]);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    disabled: loading,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const canSubmit = !loading && !isSubmitting && isDirty;

  const onSubmit = values => {
    setLoading(true);
    dispatch(login(values))
      .unwrap()
      .then(() => {
        reset();
        setLoading(false);
        onSuccess && onSuccess();
      })
      .catch(error => {
        setLoading(false);
        errorHandler(error, t('errors.loginFailed'));
      });
  };

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <EmailField
                name="email"
                placeholder={t('fields.email.placeholder')}
                label={t('fields.email.label')}
                required
              />
              <InputField
                name="password"
                type="password"
                label={t('fields.password.label')}
                placeholder={t('fields.password.placeholder')}
                startIcon={
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ opacity: 0.7 }} />
                  </InputAdornment>
                }
                required
              />
            </Stack>

            <SubmitButton loading={loading || isSubmitting} disabled={!canSubmit}>
              {t('buttons.login')}
            </SubmitButton>
          </Stack>
        </form>
      </FormProvider>
    </Wrapper>
  );
};
