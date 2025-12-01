import { http, HttpResponse } from 'msw';

export const handlers = [
  // http.get(`/api/users/current`, async ({ request }) => {
  //   console.log(request.method, request.url);
  //   const auth = request.headers.get('Authorization');
  //
  //   if (!auth || !auth.startsWith('Bearer')) {
  //     return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  //   }
  //
  //   await new Promise(resolve => setTimeout(resolve, 800));
  //
  //   return HttpResponse.json(
  //     {
  //       id: 12,
  //       email: 'email@gmail.com',
  //       name: 'Roman',
  //       avatarURL: 'https://avatar.com/avatar.png',
  //     },
  //     { status: 200 }
  //   );
  // }),
  // send form
  // http.post('/api/estimates', async () => {
  //   await new Promise(resolve => setTimeout(resolve, 800));
  //
  //   return HttpResponse.json(
  //     {
  //       estimateId: 'mock_msw_123',
  //       status: 'accepted',
  //     },
  //     { status: 200 }
  //   );
  // }),
];
