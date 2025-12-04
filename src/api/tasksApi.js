import api from './axiosInstance';
import { formatToCamelCase } from './utils';

export const sendTask = async task => {
  const { data } = await api.post('/tasks', task, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return formatToCamelCase(data);
};

export const payTask = async (taskId, values) => {
  const { data } = await api.post(`/tasks/${taskId}/pay`, values);
  return formatToCamelCase(data);
};

export const getTaskDetails = async taskId => {
  const { data } = await api.get(`/tasks/${taskId}`);
  return formatToCamelCase(data);
};
