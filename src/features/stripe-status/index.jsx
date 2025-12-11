import { useSearchParams } from 'react-router-dom';
import { useStripeCheckoutSession } from './hook/useStripeCheckoutSession';
import { useEffect, useMemo } from 'react';
import { errorHandler } from '../../utils/notification';
import { Loader } from '../../components';
import { StripeSuccess, StripeCancel } from './components';

export const StripeStatus = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const { data, loading, error } = useStripeCheckoutSession(sessionId);
  const { session } = data || {};
  const { taskId, isPaid } = useMemo(() => {
    return {
      taskId: session?.metadata?.taskId || session?.clientReferenceId,
      isPaid: session?.paymentStatus === 'paid' || session?.status === 'paid',
    };
  }, [session]);

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return isPaid ? <StripeSuccess /> : <StripeCancel taskId={taskId} />;
};
