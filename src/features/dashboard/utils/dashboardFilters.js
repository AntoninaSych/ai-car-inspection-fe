export const ESTIMATE_STATUS = {
  COMPLETED: 'completed',
  PROCESSING: 'processing',
  FAILED: 'failed',
  PAYMENT: 'payment',
};

export const STATUS_TABS = [
  { value: 'all', i18nKey: 'filters.all', label: 'All' },
  { value: ESTIMATE_STATUS.COMPLETED, i18nKey: 'filters.completed' },
  { value: ESTIMATE_STATUS.PROCESSING, i18nKey: 'filters.processing' },
  { value: ESTIMATE_STATUS.PAYMENT, i18nKey: 'filters.payment' },
];

export function filterEstimates(tasks, { query, status }) {
  const q = (query || '').trim().toLowerCase();

  return tasks.filter(item => {
    const matchesQuery =
      !q ||
      item.brand.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q);

    const matchesStatus = status === 'all' ? true : item.status === status;
    return matchesQuery && matchesStatus;
  });
}

export function countByStatus(tasks) {
  return tasks.reduce(
    (acc, e) => {
      acc.total += 1;
      if (e.status === ESTIMATE_STATUS.COMPLETED) {
        acc.completed += 1;
      }
      if (e.status === ESTIMATE_STATUS.PROCESSING) {
        acc.processing += 1;
      }
      if (e.status === ESTIMATE_STATUS.PAYMENT) {
        acc.payment += 1;
      }

      return acc;
    },
    { total: 0, completed: 0, processing: 0, payment: 0 }
  );
}
