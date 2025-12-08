import { useEffect, useState } from 'react';
import { fetchTaskDetails } from '../../../api/tasksApi';
import { errorHandler } from '../../../utils/notification';

export const useTaskPaymentDetails = taskId => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchTaskDetails(taskId);
        setData(response);
      } catch (err) {
        setError(err);
        errorHandler(err, 'Error fetching details for the task');
        setData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [taskId]);

  return { data, isLoading, error };
};
