import api from './axiosInstance';
import { formatToCamelCase } from './utils';

export const getReportDetails = async taskId => {
  const { data } = await api.get(`/reports/${taskId}`);
  return formatToCamelCase(data);
};
