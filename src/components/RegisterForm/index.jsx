import { useState, useMemo } from 'react';
import { Stack, InputAdornment, Typography, Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { errorHandler, successNotification } from '../../utils/notification';
import { defaultValues } from './config';
import { createValidationSchema } from './validation/schema';
import { EmailField, InputField } from '../FormFields';
import { SubmitButton } from '../SubmitButton';
import { Wrapper } from './styled';

function passwordRules(password) {
  const min8 = (password?.length ?? 0) >= 8;
  const hasNumber = /\d/.test(password || '');
  return { min8, hasNumber };
}

export const RegisterForm = ({ onSuccess }) => {
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
    // register: formRegister,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
  } = methods;

  const passwordValue = watch('password');
  // const agreeValue = watch('agree');
  const rules = useMemo(() => passwordRules(passwordValue), [passwordValue]);
  const canSubmit = Object.values(rules).every(value => value) && !isSubmitting && !loading && isDirty;

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
            <InputField
              name="name"
              label={t('fields.fullname.label')}
              placeholder={t('fields.fullname.placeholder')}
              startIcon={
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ opacity: 0.7 }} />
                </InputAdornment>
              }
              required
            />
            <EmailField
              name="email"
              placeholder={t('fields.email.placeholder')}
              label={t('fields.email.label')}
              required
            />
            <Stack spacing={1}>
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
              <Box sx={{ mt: 1.25, display: 'grid', gap: 0.75 }}>
                <RuleRow ok={rules.min8} label="Minimum 8 characters" />
                <RuleRow ok={rules.hasNumber} label="Contains a number" />
              </Box>
            </Stack>

            {/*<Box>*/}
            {/*  <FormControlLabel*/}
            {/*    sx={{ alignItems: 'center' }}*/}
            {/*    control={<Checkbox {...formRegister('agree')} sx={{ mt: 0.2 }} />}*/}
            {/*    label={*/}
            {/*      <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>*/}
            {/*        I agree to the{' '}*/}
            {/*        <Link href={termsHref} underline="hover">*/}
            {/*          Terms of Service*/}
            {/*        </Link>{' '}*/}
            {/*        and{' '}*/}
            {/*        <Link href={privacyHref} underline="hover">*/}
            {/*          Privacy Policy*/}
            {/*        </Link>*/}
            {/*      </Typography>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  {!!errors.agree && (*/}
            {/*    <Typography sx={{ mt: 0.5, color: 'error.main', fontSize: 13 }}>{errors.agree.message}</Typography>*/}
            {/*  )}*/}
            {/*</Box>*/}

            <SubmitButton loading={loading || isSubmitting} disabled={!canSubmit}>
              {t('buttons.createAccount')}
            </SubmitButton>
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
