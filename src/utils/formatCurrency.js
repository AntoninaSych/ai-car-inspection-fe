const LOCALE_BY_LANGUAGE = {
  en: 'en-US',
  uk: 'uk-UA',
  ua: 'uk-UA',
  pl: 'pl-PL',
};

const resolveMoneyLocale = (locale, currency) => {
  if ((currency || '').toUpperCase() === 'USD') return 'en-US';
  return locale || 'en-US';
};

export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  if (value == null || Number.isNaN(value)) {
    return '-';
  }

  const normalizedLocale = LOCALE_BY_LANGUAGE[locale] || locale;
  const moneyLocale = resolveMoneyLocale(normalizedLocale, currency);

  return new Intl.NumberFormat(moneyLocale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
