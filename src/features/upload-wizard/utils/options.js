import { MAKE_OPTIONS } from '../constants';

const currentYear = new Date().getFullYear();

export const getYearOptions = (startYear = 1980) => {
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
    const year = currentYear - i;
    return {
      label: `${year}`,
      value: `${year}`,
    };
  });
};

export const getMakeOptions = () => {
  return [...MAKE_OPTIONS].sort((a, b) => a.label.localeCompare(b.label));
};
