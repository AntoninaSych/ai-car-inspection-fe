import api from '../../../api/axiosInstance';

export const directAccess = async token => {
  const { data } = await api.get(`/auth/direct-access`, {
    params: { token },
  });

  return data;
};
