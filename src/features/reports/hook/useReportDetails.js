import { useEffect, useState } from 'react';
import { errorHandler } from '../../../utils/notification';
import { getReportDetails } from '../../../api/reportsApi';

export const useReportDetails = reportId => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reportId) {
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const {
          ok,
          report: {
            data: { analysis, success },
          },
        } = await getReportDetails(reportId);
        if (ok) {
          setData({ report: analysis, success });
        }
      } catch (err) {
        setError(err);
        errorHandler(err, 'Error fetching the report');
        setData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [reportId]);

  return { data, isLoading, error };
};
