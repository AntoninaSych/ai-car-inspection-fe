import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, Container, Typography, Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { payTask } from '../../api/tasksApi';
import { useTaskPaymentDetails } from './hook/useTaskPaymentDetails';
import { Loader } from '../../components';
import { PaymentForm } from './components';
import { errorHandler } from '../../utils/notification';
import { defaultValues } from './config';

export const PaymentWizard = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['payment', 'common']);
  const { data: paymentDetails, isLoading, error } = useTaskPaymentDetails(taskId);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, setValue, formState } = methods;
  const { isSubmitting } = formState;

  console.log(error);

  const onSubmit = async values => {
    try {
      const response = await payTask(taskId, values);

      if (response.ok && response.taskId === taskId) {
        navigate('/thank-you', {
          state: {
            from: 'payment',
            taskId,
          },
        });
      } else {
        navigate('/thank-you');
      }
    } catch (error) {
      errorHandler(error, t('payment:unknownError', 'Something went wrong during payment. Please try again.'));
    }
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
          {t('payment:noTaskId', 'Task not found')}
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('payment:serverError', 'An error occurred. Please try again later.')}</AlertTitle>
      </Alert>
    );
  }

  if (paymentDetails && paymentDetails.task?.isPaid) {
    return (
      <Alert severity="success" sx={{ mt: 3 }}>
        <AlertTitle>{t('payment:paid', 'Has already paid, thank you!')}</AlertTitle>
      </Alert>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          {t('payment:title', 'Payment')}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {t(
            'payment:description',
            'Please fill in the payment details. After a successful payment you will receive an email with your estimate.'
          )}
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <PaymentForm />

            <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} disabled={isSubmitting} fullWidth>
              {isSubmitting ? t('payment:button.processing', 'Processing payment…') : t('payment:button.submit', 'Pay')}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};
