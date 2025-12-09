import { getReportDetails } from '../../../api/reportsApi';
import { useQuery } from '@tanstack/react-query';

export const useReportDetails = reportId => {
  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reportDetails', reportId],
    queryFn: () => getReportDetails(reportId),
    enabled: !!reportId,
    staleTime: 1000 * 60 * 60, // cache 1 hour
  });

  return { data, isLoading, error };
};
