export const ESTIMATE_STATUS = {
  COMPLETED: 'report_generated',
  PROCESSING: 'image_uploaded',
  PAYMENT: 'payment',
};

export const STATUS_TABS = [
  { value: 'all', i18nKey: 'all', label: 'All' },
  { value: ESTIMATE_STATUS.COMPLETED, i18nKey: 'completed', label: 'Completed' },
  { value: ESTIMATE_STATUS.PROCESSING, i18nKey: 'processing', label: 'Processing' },
  { value: ESTIMATE_STATUS.PAYMENT, i18nKey: 'payment', label: 'Payment' },
];

export function filterEstimates(estimates, { query, status }) {
  const q = (query || '').trim().toLowerCase();

  console.log(query, status);

  return estimates.filter(item => {
    const matchesQuery =
      !q ||
      item.brand.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q);

    let matchesStatus = status === 'all';

    if (ESTIMATE_STATUS.PAYMENT === status) {
      matchesStatus = !item.isPaid;
    } else if (ESTIMATE_STATUS.PROCESSING === status) {
      matchesStatus = item.isPaid && status === ESTIMATE_STATUS.PROCESSING;
    }

    return matchesQuery && matchesStatus;
  });
}

export function countByStatus(estimates) {
  return estimates.reduce(
    (acc, e) => {
      acc.total += 1;
      if (e.status === ESTIMATE_STATUS.COMPLETED) {
        acc.completed += 1;
      }
      if (e.status === ESTIMATE_STATUS.PROCESSING && e.isPaid) {
        acc.processing += 1;
      }
      if (!e.isPaid) {
        acc.payment += 1;
      }

      return acc;
    },
    { total: 0, completed: 0, processing: 0, payment: 0 }
  );
}
