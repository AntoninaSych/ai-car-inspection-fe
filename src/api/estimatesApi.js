import api from './axiosInstance';

export const sendEstimates = async estimatesData => {
  const { data } = await api.post('/estimates', estimatesData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
