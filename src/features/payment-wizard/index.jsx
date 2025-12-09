import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Container, Typography, Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { payTask } from '../../api/tasksApi';
import { useTaskPaymentDetails } from './hook/useTaskPaymentDetails';
import { Loader } from '../../components';
import { PaymentForm, PaymentProcessing } from './components';
import { errorHandler } from '../../utils/notification';
import { defaultValues } from './config';
import { ROUTERS } from '../../constants';

export const PaymentWizard = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('payment');
  const { data: paymentDetails, isLoading, error } = useTaskPaymentDetails(taskId);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, setValue, formState, watch } = methods;
  const { isSubmitting } = formState;
  const paymentMethod = watch('paymentMethod');

  const onSubmit = async values => {
    try {
      const response = await payTask(taskId, values);

      if (response?.reportId) {
        const { reportId } = response;
        navigate(`${ROUTERS.REPORTS}/${reportId}`);
      } else {
        navigate(ROUTERS.SUCCESS, {
          state: {
            from: 'payment',
          },
        });
      }
    } catch (error) {
      errorHandler(error, t('paymentError', 'Something went wrong during payment. Please try again.'));
    }
  };

  const handleSkip = event => {
    event.preventDefault();
    navigate(ROUTERS.PROFILE, {
      state: {
        from: 'payment',
      },
    });
  };

  useEffect(() => {
    if (paymentDetails && paymentDetails.task?.price) {
      setValue('amount', paymentDetails.task.price);
    }
  }, [paymentDetails, setValue]);

  if (isLoading) {
    return <Loader />;
  }

  if (!taskId) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" mt={4}>
          {t('noTaskId', 'Task not found')}
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('serverError', 'An error occurred. Please try again later.')}</AlertTitle>
      </Alert>
    );
  }

  if (isSubmitting) {
    return <PaymentProcessing t={t} paymentMethod={paymentMethod} />;
  }

  if (paymentDetails && paymentDetails.task?.isPaid) {
    return (
      <Alert severity="success" sx={{ mt: 3 }}>
        <AlertTitle>{t('paid', 'Has already paid!')}</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('title', 'Payment')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {paymentDetails?.task?.brand}, {paymentDetails?.task?.model} ({paymentDetails?.task?.year})
      </Typography>
      <Typography variant="caption" color="text.secondary" mb={2}>
        {new Date(paymentDetails?.task?.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={3}>
        {t(
          'description',
          'Please fill in the payment details. After a successful payment you will receive an email with your estimate.'
        )}
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PaymentForm />

          <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} disabled={isSubmitting} fullWidth>
            {isSubmitting ? t('button.processing', 'Processing payment…') : t('button.submit', 'Pay')}
          </Button>
          <Button onClick={handleSkip} variant="outlined" size="large" sx={{ mt: 3 }} disabled={isSubmitting} fullWidth>
            {t('button.skip', 'Skip')}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
