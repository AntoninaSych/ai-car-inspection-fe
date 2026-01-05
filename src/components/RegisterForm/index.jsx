import { useState, useMemo } from 'react';
import { Stack, InputAdornment } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { errorHandler, successNotification } from '../../utils/notification';
import { defaultValues } from './config';
import { createValidationSchema, PASSWORD_MIN } from './validation/schema';
import { EmailField, InputField } from '../FormFields';
import { SubmitButton } from '../SubmitButton';
import { Wrapper } from './styled';

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
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  // const agreeValue = watch('agree');
  const canSubmit = !isSubmitting && !loading && isDirty && isValid;

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
          <Stack gap={3}>
            <Stack gap={1}>
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
              <InputField
                name="password"
                type="password"
                label={t('fields.password.label')}
                placeholder={t('common:validation.minString', { value: PASSWORD_MIN })}
                startIcon={
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ opacity: 0.7 }} />
                  </InputAdornment>
                }
                required
                showRules
              />

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
            </Stack>
            <SubmitButton variant="gradient" loading={loading || isSubmitting} disabled={!canSubmit}>
              {t('buttons.createAccount')}
            </SubmitButton>
          </Stack>
        </form>
      </FormProvider>
    </Wrapper>
  );
};
