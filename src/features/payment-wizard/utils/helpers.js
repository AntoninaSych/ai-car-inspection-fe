export const formatCardExpiry = value => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;

  const month = digits.slice(0, 2);
  const year = digits.slice(2, 4);

  return `${month}/${year}`;
};

export const formatCardNumber = value => {
  const digits = value.replace(/\D/g, '').slice(0, 19); // максимум 19 цифр
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

export const getCardBrand = digits => {
  if (!digits) {
    return null;
  }

  if (/^4/.test(digits)) {
    return 'Visa';
  }
  if (/^5[1-5]/.test(digits)) {
    return 'Mastercard';
  }
  if (/^3[47]/.test(digits)) {
    return 'American Express';
  }

  return null;
};

export const formatAmount = value => {
  if (!value) {
    return '';
  }

  let cleaned = value.replace(/[^\d,.]/g, '');
  cleaned = cleaned.replace(',', '.');

  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }

  const num = parseFloat(cleaned);
  if (isNaN(num)) {
    return '';
  }

  return num.toFixed(2);
};
