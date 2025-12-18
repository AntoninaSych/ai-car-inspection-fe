import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FormLabel, InputAdornment, Stack, Typography, FormControl, IconButton, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { errorHandler } from '../../utils/notification';
import { TextField } from '../FormFields';
import { defaultValues } from './config';
import { createValidationSchema } from './validation/schema';
import { Wrapper } from './styled';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export const LoginForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    formState: { isSubmitting, isDirty, errors },
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
              <FormControl fullWidth error={!!errors.name}>
                <FormLabel htmlFor="email">
                  {t('fields.email.label')} <Typography component="span">*</Typography>
                </FormLabel>
                <TextField
                  placeholder={t('fields.email.placeholder')}
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon sx={{ opacity: 0.7 }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </FormControl>
              <FormControl fullWidth error={!!errors.password}>
                <FormLabel htmlFor="password">
                  {t('fields.password.label')} <Typography component="span">*</Typography>
                </FormLabel>
                <TextField
                  placeholder={t('fields.password.placeholder')}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="off"
                  required
                  InputProps={{
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
                  }}
                />
              </FormControl>
            </Stack>

            <Button
              type="submit"
              loading={loading || isSubmitting}
              disabled={!canSubmit}
              sx={{
                mt: 0.5,
                height: 56,
                borderRadius: 3,
                fontSize: 18,
                fontWeight: 800,
                textTransform: 'none',
                color: 'common.white',
                background: 'linear-gradient(90deg, #2B6AF6 0%, #7C2CF3 70%, #A12AF0 100%)',
                boxShadow: '0 14px 30px rgba(47, 89, 246, 0.35)',
                '&:hover': {
                  filter: 'brightness(1.02)',
                },
                '&.Mui-disabled': {
                  color: 'rgba(255,255,255,0.75)',
                  background:
                    'linear-gradient(90deg, rgba(43,106,246,0.45) 0%, rgba(124,44,243,0.45) 70%, rgba(161,42,240,0.45) 100%)',
                },
              }}
            >
              {t('buttons.login')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Wrapper>
  );
};
