import { useQuery } from '@tanstack/react-query';
import { getStripeCheckoutSession } from '../../../api/stripeApi';

export const useStripeCheckoutSession = sessionId => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stripeCheckoutSession', sessionId],
    queryFn: () => getStripeCheckoutSession(sessionId),
    enabled: !!sessionId,
  });

  return {
    data,
    isLoading,
    error,
  };
};
