import { useQuery } from '@tanstack/react-query';
import { fetchCurrentTasks } from '../api/tasksApi';

export const useCurrentTasks = () => {
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks', 'current'],
    queryFn: fetchCurrentTasks,
    staleTime: 1000 * 60, // cache 1 minute
  });

  return {
    tasks,
    isLoading,
    error,
  };
};
