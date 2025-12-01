import api from './axiosInstance';

export const sendTask = async task => {
  const { data } = await api.post('/tasks', task, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
