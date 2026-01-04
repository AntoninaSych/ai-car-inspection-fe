export const formatDate = (date, locale = 'en-US') => {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};
