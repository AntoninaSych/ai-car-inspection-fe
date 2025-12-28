import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Container, Typography, Alert, AlertTitle } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { payTask } from '../../api/tasksApi';
import { useTaskPaymentDetails } from './hook/useTaskPaymentDetails';
import { Loader } from '../../components';
import { PaymentForm, PaymentProcessing } from './components';
import { errorHandler, errorNotification } from '../../utils/notification';
import { ROUTERS } from '../../constants';
import { createStripeCheckoutSession } from '../../api/stripeApi';
import { createPaymentWizardSchema } from './validation/schema';
import { DEFAULT_CURRENCY, defaultValues } from './config';
import { PAYMENT_METHODS } from './constants';

export const PaymentWizard = () => {
  const { taskId } = useParams();
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(['payment', 'common']);
  const paymentWizardSchema = useMemo(() => createPaymentWizardSchema(t), [t]);
  const { data: paymentDetails, isLoading, error } = useTaskPaymentDetails(taskId);
  const methods = useForm({
    resolver: yupResolver(paymentWizardSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, formState, watch } = methods;
  const { isSubmitting, isDirty } = formState;
  const paymentMethod = watch('paymentMethod');

  const handleStripePayment = async values => {
    try {
      setRedirecting(true);

      const response = await createStripeCheckoutSession({
        task_id: taskId,
        amount: Math.round(Number(values.amount) * 100),
        currency: (values.currency || DEFAULT_CURRENCY).toLowerCase(),
        full_name: values.fullName,
      });

      if (response?.url) {
        window.location.href = response.url;
        return;
      }

      errorNotification(t('payment:stripe.errors.checkoutUrl'));
    } catch (error) {
      errorHandler(error, t('payment:error'));
      setRedirecting(false);
    }
  };

  const handleDefaultPayment = async values => {
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

  const onSubmit = async values => {
    if (values.paymentMethod === PAYMENT_METHODS.STRIPE) {
      return handleStripePayment(values);
    }

    return handleDefaultPayment(values);
  };

  const handleSkip = event => {
    event.preventDefault();
    navigate(ROUTERS.DASHBOARD, {
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
          {t('payment:noTaskId')}
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('common:errors.unknown')}</AlertTitle>
      </Alert>
    );
  }

  if (isSubmitting || redirecting) {
    return <PaymentProcessing paymentMethod={paymentMethod} />;
  }

  if (paymentDetails && paymentDetails.task?.isPaid) {
    return (
      <Alert severity="success" sx={{ mt: 3 }}>
        <AlertTitle>{t('payment:paid')}</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('payment:title')}
        <br />({paymentDetails?.task?.id})
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {paymentDetails?.task?.brand}, {paymentDetails?.task?.model} ({paymentDetails?.task?.year})
      </Typography>
      <Typography variant="caption" color="text.secondary" mb={2}>
        {new Date(paymentDetails?.task?.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={3}>
        {t('payment:description')}
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
            {isSubmitting ? t('payment:button.processing') : t('payment:button.submit')}
          </Button>
          <Button onClick={handleSkip} variant="outlined" size="large" sx={{ mt: 3 }} disabled={isSubmitting} fullWidth>
            {t('payment:button.skip')}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
