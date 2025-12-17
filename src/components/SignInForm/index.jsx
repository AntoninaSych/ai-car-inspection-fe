import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { errorHandler } from '../../utils/notification';
import { Button } from '../../design-system';
import { TextField } from '../FormFields';
import { defaultValues } from './config';
import { createValidationSchema } from './validation/schema';
import { Wrapper } from './styled';

export const SignInForm = ({ onSuccess }) => {
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
              <TextField label={t('labels.email')} name="email" required />
              <TextField label={t('labels.password')} type="password" name="password" autoComplete="off" required />
            </Stack>

            <Button
              size="large"
              type="submit"
              isLoading={loading}
              disabled={loading || isSubmitting || !isDirty}
              fullWidth
            >
              {t('buttons.login')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Wrapper>
  );
};

export default SignInForm;
