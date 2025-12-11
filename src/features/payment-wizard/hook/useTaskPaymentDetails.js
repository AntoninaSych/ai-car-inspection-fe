import { useQuery } from '@tanstack/react-query';
import { fetchTaskDetails } from '../../../api/tasksApi';

export const useTaskPaymentDetails = taskId => {
  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['paymentDetails', taskId],
    queryFn: () => fetchTaskDetails(taskId),
    enabled: !!taskId,
    // staleTime: 1000 * 60 * 60, // cache 1 hour
  });

  return { data, isLoading, error };
};
