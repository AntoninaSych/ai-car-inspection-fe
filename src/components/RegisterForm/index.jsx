import { useState, useMemo } from 'react';
import {
  Stack,
  InputAdornment,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Checkbox,
  IconButton,
  Link,
  Box,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { errorHandler, successNotification } from '../../utils/notification';
import { TextField } from '../FormFields';
import { defaultValues } from './config';
import { createValidationSchema } from './validation/schema';
import { Wrapper } from './styled';

function passwordRules(password) {
  const min8 = (password?.length ?? 0) >= 8;
  const hasNumber = /\d/.test(password || '');
  return { min8, hasNumber };
}

export const RegisterForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = useMemo(() => createValidationSchema(t), [t]);
  const termsHref = '#';
  const privacyHref = '#';

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    disabled: loading,
  });

  const {
    register: formRegister,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = methods;

  const passwordValue = watch('password');
  const agreeValue = watch('agree');
  const rules = useMemo(() => passwordRules(passwordValue), [passwordValue]);
  const canSubmit = Object.values(rules).every(value => value) && agreeValue && !isSubmitting && !loading && isDirty;

  console.log(rules);
  console.log(Object.values(rules).every(value => value));

  const onSubmit = values => {
    setLoading(true);
    dispatch(register(values))
      .unwrap()
      .then(() => {
        reset();
        setLoading(false);
        onSuccess && onSuccess();
        successNotification('Success registration');
      })
      .catch(error => {
        setLoading(false);
        if (error?.message === 'Email in use') {
          errorHandler(error, t('errors.emailInUse'));
        } else {
          errorHandler(error, t('errors.registrationFailed'));
        }
      });
  };

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <FormControl fullWidth error={!!errors.name}>
              <FormLabel htmlFor="name">
                {t('fields.fullname.label')} <Typography component="span">*</Typography>
              </FormLabel>
              <TextField
                name="name"
                placeholder={t('fields.fullname.placeholder')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.email}>
              <FormLabel htmlFor="email">
                {t('fields.email.label')} <Typography component="span">*</Typography>
              </FormLabel>
              <TextField
                name="email"
                placeholder={t('fields.email.placeholder')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
              />
            </FormControl>

            <FormControl fullWidth error={!!errors.password}>
              <FormLabel htmlFor="password">
                {t('fields.password.label')} <Typography component="span">*</Typography>
              </FormLabel>
              <TextField
                type={showPassword ? 'text' : 'password'}
                placeholder={t('fields.password.placeholder')}
                name="password"
                autoComplete="off"
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
                fullWidth
                required
              />
              <Box sx={{ mt: 1.25, display: 'grid', gap: 0.75 }}>
                <RuleRow ok={rules.min8} label="Minimum 8 characters" />
                <RuleRow ok={rules.hasNumber} label="Contains a number" />
              </Box>
            </FormControl>

            {/* Terms */}
            <Box>
              <FormControlLabel
                sx={{ alignItems: 'center' }}
                control={<Checkbox {...formRegister('agree')} sx={{ mt: 0.2 }} />}
                label={
                  <Typography sx={{ color: 'text.secondary' }}>
                    I agree to the{' '}
                    <Link href={termsHref} underline="hover" sx={{ fontWeight: 600 }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href={privacyHref} underline="hover" sx={{ fontWeight: 600 }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
              {!!errors.agree && (
                <Typography sx={{ mt: 0.5, color: 'error.main', fontSize: 13 }}>{errors.agree.message}</Typography>
              )}
            </Box>

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
              {t('buttons.createAccount')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Wrapper>
  );
};

function RuleRow({ ok, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {ok ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: 'success.main' }} />
      ) : (
        <CancelOutlinedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
      )}
      <Typography sx={{ fontSize: 12, color: ok ? 'text.primary' : 'text.secondary' }}>{label}</Typography>
    </Box>
  );
}
