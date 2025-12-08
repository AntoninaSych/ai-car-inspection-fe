import { useQuery } from '@tanstack/react-query';
import { fetchCurrentTasks } from '../../../api/tasksApi';

export const useProfileData = () => {
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks', 'current'],
    queryFn: fetchCurrentTasks,
  });

  return {
    tasks,
    isLoading,
    error,
  };
};
