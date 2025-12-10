import { useState } from 'react';
import { Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { errorHandler, successNotification } from '../../utils/notification';
import { Button } from '../../design-system';
import { TextField } from '../FormFields';
import { defaultValues } from './const';
import { validationSchema } from './const/validation';
import css from './SignUpForm.module.css';

export const SignUpForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
        console.log(error);
        if (error?.message === 'Email in use') {
          errorHandler(error, t('errors.emailInUse'));
        } else {
          errorHandler(error, t('errors.registrationFailed'));
        }
      });
  };

  return (
    <div className={css.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction={{ sm: 'column', md: 'row' }} spacing={1}>
              <TextField name="name" label={t('labels.name')} fullWidth required />
              <TextField name="email" label={t('labels.email')} fullWidth required />
            </Stack>

            <TextField type="password" label={t('labels.password')} name="password" fullWidth required />

            <Button
              size="large"
              type="submit"
              isLoading={loading}
              disabled={loading || isSubmitting || !isDirty}
              fullWidth
            >
              {t('buttons.register')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpForm;
