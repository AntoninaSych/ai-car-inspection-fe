import api from './axiosInstance';

export const usersSignup = async user => {
  const { data } = await api.post('/users/register', user);
  return data;
};

export const usersLogin = async user => {
  const { data } = await api.post('/users/login', user);
  return data;
};

export const usersLogout = async () => {
  await api.post('/users/logout', {});
};

export const fetchCurrentUser = async () => {
  const { data } = await api.get('/users/current', { skipGlobalErrorHandler: true });
  return data;
};
