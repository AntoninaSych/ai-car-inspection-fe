import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Container, Typography, Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { payTask } from '../../api/tasksApi';
import { useTaskPaymentDetails } from './hook/useTaskPaymentDetails';
import { Loader } from '../../components';
import { PaymentForm, PaymentProcessing } from './components';
import { errorHandler, errorNotification } from '../../utils/notification';
import { DEFAULT_CURRENCY, defaultValues } from './config';
import { ROUTERS } from '../../constants';
import { createStripeCheckoutSession } from '../../api/stripeApi';
import { PAYMENT_METHODS } from './constants';

export const PaymentWizard = () => {
  const { taskId } = useParams();
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(['payment', 'common']);
  const { data: paymentDetails, isLoading, error } = useTaskPaymentDetails(taskId);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, setValue, formState, watch } = methods;
  const { isSubmitting, isDirty } = formState;
  const paymentMethod = watch('paymentMethod');

  const onSubmit = async values => {
    if (values.paymentMethod === PAYMENT_METHODS.STRIPE) {
      try {
        setRedirecting(true);
        const res = await createStripeCheckoutSession({
          task_id: taskId,
          amount: Math.round(Number(values.amount) * 100),
          currency: (values.currency || DEFAULT_CURRENCY).toLowerCase(),
          full_name: values.fullName,
        });

        if (res?.url) {
          window.location.href = res.url;
        } else {
          errorNotification('Stripe did not return checkout url');
          setRedirecting(false);
        }
      } catch (error) {
        errorHandler(error, t('payment:error'));
        setRedirecting(false);
      }
      return;
    }

    try {
      await payTask(taskId, values);
      navigate(ROUTERS.SUCCESS, {
        state: {
          from: `payment.${values.paymentMethod}`,
        },
      });
    } catch (error) {
      errorHandler(error, t('payment:error'));
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
          {t('payment:noTaskId', 'Task not found')}
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('common:errors.unknown', 'An error occurred. Please try again later.')}</AlertTitle>
      </Alert>
    );
  }

  if (isSubmitting || redirecting) {
    return <PaymentProcessing paymentMethod={paymentMethod} />;
  }

  if (paymentDetails && paymentDetails.task?.isPaid) {
    return (
      <Alert severity="success" sx={{ mt: 3 }}>
        <AlertTitle>{t('payment:paid', 'Has already paid!')}</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('payment:title', 'Payment')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {paymentDetails?.task?.brand}, {paymentDetails?.task?.model} ({paymentDetails?.task?.year})
      </Typography>
      <Typography variant="caption" color="text.secondary" mb={2}>
        {new Date(paymentDetails?.task?.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={3}>
        {t(
          'payment:description',
          'Please fill in the payment details. After a successful payment you will receive an email with your estimate.'
        )}
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PaymentForm />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={isSubmitting || !isDirty}
            fullWidth
          >
            {isSubmitting ? t('payment:button.processing', 'Processing payment…') : t('payment:button.submit', 'Pay')}
          </Button>
          <Button onClick={handleSkip} variant="outlined" size="large" sx={{ mt: 3 }} disabled={isSubmitting} fullWidth>
            {t('payment:button.skip', 'Skip')}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
