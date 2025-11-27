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
