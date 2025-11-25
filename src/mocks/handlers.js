import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/estimates', async ({ request }) => {
    const formData = await request.formData();
    const front = formData.get('front');

    console.log(front);

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(
      {
        estimateId: 'mock_msw_123',
        status: 'accepted',
      },
      { status: 200 }
    );
  }),
];
