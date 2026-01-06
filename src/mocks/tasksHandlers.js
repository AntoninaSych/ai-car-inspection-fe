import { http, HttpResponse } from 'msw';
import tasksCurrentResponse from './data/tasksCurrent.json';

export const tasksHandlers = [
  // add task
  http.post('/_api/tasks', async ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(
      {
        message: 'User has reached the limit of unpaid tasks.',
        internalCode: 'UNPAID_TASK_LIMIT_REACHED',
      },
      { status: 409 }
    );
  }),

  // pay task
  http.post('/_api/tasks/:taskId/pay', async ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(
      {
        message: 'Server Error',
      },
      { status: 500 }
    );
  }),

  http.get(`/_api/tasks/:taskId`, async ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(
      {
        ok: true,
        task: {
          id: 'c1943789-3523-40d2-a7a6-82e42c224204',
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

  http.get(`/_api/tasks/current`, async ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    return HttpResponse.json(tasksCurrentResponse, { status: 200 });
  }),
];
