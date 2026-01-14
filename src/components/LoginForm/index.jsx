import { useState, useMemo } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel, IconButton, InputAdornment, Stack, TextField, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../../redux/auth/operations';
import { errorHandler } from '../../utils/notification';
import { defaultValues } from './config';
import { createValidationSchema } from './validation/schema';
import { EmailField } from '../FormFields';
import { SubmitButton } from '../SubmitButton';
import { Wrapper } from './styled';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { LinkButton } from '../LinkButton';

export const LoginForm = ({ onSuccess, onForgotPassword }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = useMemo(() => createValidationSchema(t), [t]);

  const passwordType = showPassword ? 'text' : 'password';

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    disabled: loading,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = methods;

  const canSubmit = !loading && !isSubmitting && isDirty;

  const handleOnForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

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
          <Stack gap={3}>
            <Stack gap={1}>
              <EmailField
                name="email"
                placeholder={t('fields.email.placeholder')}
                label={t('fields.email.label')}
                required
              />

              <FormControl fullWidth error={!!errors.password}>
                <FormLabel htmlFor="password" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    {t('fields.password.label')} <Typography component="span">*</Typography>
                  </Box>
                  <LinkButton onClick={handleOnForgotPassword}>{t('forgotPassword')}</LinkButton>
                </FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <Stack gap={1}>
                        <TextField
                          {...field}
                          type={passwordType}
                          autoComplete="off"
                          placeholder={t('fields.password.placeholder')}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockOutlinedIcon sx={{ opacity: 0.7 }} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => setShowPassword(s => !s)} edge="end">
                                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                          required
                        />
                      </Stack>
                    );
                  }}
                />
              </FormControl>
            </Stack>
            <SubmitButton variant="gradient" loading={loading || isSubmitting} disabled={!canSubmit}>
              {t('buttons.login')}
            </SubmitButton>
          </Stack>
        </form>
      </FormProvider>
    </Wrapper>
  );
};
