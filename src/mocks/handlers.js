import { http, HttpResponse } from 'msw';

export const handlers = [
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

  http.get(`/___api/tasks/:taskId`, async ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(
      {
        ok: true,
        task: {
          id: 'abe953f0-ad15-4ab7-b786-6e1891ad7577',
          brand: 'Acura',
          model: 'CDX',
          year: 2017,
          mileage: 152000,
          description: null,
          status: 'image_uploaded',
          is_paid: true,
          images: [
            {
              id: '99281bea-d0f9-47d1-a5b1-e7828b7bd89f',
              type: 'front',
              path: 'uploads/tasks/1764812989740-198066161.jpg',
              verified: false,
            },
          ],
          reports: [],
          ai_analysis: null,
          created_at: '2025-12-04T01:49:49.752Z',
          updated_at: '2025-12-04T01:49:49.752Z',
        },
      },
      { status: 200 }
    );
  }),
];
