import { formatCurrency } from '../../../utils/formatCurrency';

const costPayload = '-';

const toNumber = value => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

export const getEstimatedCost = (reports, returnFormatted = true) => {
  if (!reports) {
    return costPayload;
  }

  const list = Array.isArray(reports) ? reports : [reports];

  const successfulReports = list.filter(r => r?.data?.success && r?.data?.analysis);

  if (!successfulReports.length) {
    return costPayload;
  }

  const { currency, locale } = successfulReports[0].data.analysis;

  const total = successfulReports.reduce((sum, report) => {
    const { analysis } = report.data;

    const costs = analysis?.estimatedTotalPartsCostAlternative ?? analysis?.estimatedTotalPartsCostOriginal;

    const laborCost = toNumber(analysis?.estimatedTotalLaborCost);
    const partsCost = toNumber(costs);

    return sum + laborCost + partsCost;
  }, 0);

  return returnFormatted ? formatCurrency(total, currency, locale) : total;
};

export const getEstimatedCostByTasks = tasks => {
  if (!tasks) {
    return costPayload;
  }

  const paidTasks = tasks.filter(t => t.isPaid && t.reports.length > 0);

  if (!paidTasks.length) {
    return costPayload;
  }

  const { currency, locale } = paidTasks[0].reports[0].data.analysis;

  const total = paidTasks.reduce((sum, task) => {
    return sum + getEstimatedCost(task.reports, false);
  }, 0);

  return formatCurrency(total, currency, locale);
};
