import { http, HttpResponse } from 'msw';
import { apiPrefix } from './config';

const mockedLoginResponse = {
  token: '123456',
  user: {
    id: '9f25fd68-22de-42a1-a7ed-525a259aded4',
    name: 'John',
    email: 'john.king@gmail.com',
    avatarURL: 'https://i.pravatar.cc/300',
    emailVerified: true,
  },
};

export const authHandlers = [
  http.post(`${apiPrefix}/users/login`, async ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer')) {
      return HttpResponse.json({ message: 'Unauthorized', internalCode: 'AUTH_NOT_AUTHORIZED' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(mockedLoginResponse, { status: 200 });
  }),
];
