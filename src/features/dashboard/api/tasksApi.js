import api from '../../../api/axiosInstance';
import { formatToCamelCase } from '../../../api/utils';

export const fetchCurrentTasks = async () => {
  const { data } = await api.get('/tasks/current');
  const { tasks = [] } = data || {};
  return formatToCamelCase(tasks);
};
