import api from './default';
import { setAuthHeader } from './utils';

export const usersSignup = async user => {
  const { data } = await api.post('/users/register', user);
  return data;
};

export const usersLogin = async user => {
  const { data } = await api.post('/users/login', user);
  return data;
};

export const usersLogout = async token => {
  await api.post(
    '/users/logout',
    {},
    {
      headers: {
        Authorization: setAuthHeader(token),
      },
    }
  );
};

export const fetchCurrentUser = async token => {
  const { data } = await api.get('/users/current', {
    headers: {
      Authorization: setAuthHeader(token),
    },
  });
  return data;
};
