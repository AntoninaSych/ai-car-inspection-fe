export const getEstimatedCost = (reports, returnFormatted = true) => {
  if (!reports) {
    return '******';
  }

  const list = Array.isArray(reports) ? reports : [reports];

  const successfulReports = list.filter(r => r?.data?.success && r?.data?.analysis);

  if (!successfulReports.length) {
    return '------';
  }

  const { currency, locale } = successfulReports[0].data.analysis;

  const total = successfulReports.reduce((sum, report) => {
    const { analysis } = report.data;

    return (
      sum +
      Number(analysis?.estimatedTotalLaborCost || 0) +
      Number(analysis?.estimatedTotalPartsCostAlternative || 0) +
      Number(analysis?.estimatedTotalPartsCostOriginal || 0)
    );
  }, 0);

  return returnFormatted
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(total)
    : total;
};

export const getEstimatedCostByTasks = tasks => {
  if (!tasks) {
    return '******';
  }

  const paidTasks = tasks.filter(t => t.isPaid);

  if (!paidTasks.length) {
    return '------';
  }

  const { currency, locale } = paidTasks[0].reports[0].data.analysis;

  const total = paidTasks.reduce((sum, task) => {
    return sum + getEstimatedCost(task.reports, false);
  }, 0);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(total);
};
