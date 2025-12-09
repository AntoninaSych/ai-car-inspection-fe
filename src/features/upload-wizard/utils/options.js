const currentYear = new Date().getFullYear();

export const getYearOptions = (startYear = 1980, endYear = currentYear) => {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = endYear - index;
    return {
      label: `${year}`,
      id: year,
    };
  });
};
