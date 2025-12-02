import api from './axiosInstance';

const formatCreateTaskResponse = data => {
  return {
    ...data,
    taskId: data.task_id,
  };
};

export const sendTask = async task => {
  const { data } = await api.post('/tasks', task, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return formatCreateTaskResponse(data);
};
