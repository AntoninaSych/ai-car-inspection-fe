import api from './axiosInstance';
import { formatToCamelCase } from './utils';

export const fetchCarBrands = async search => {
  const { data } = await api.get('/cars/brands', { params: { search } });
  const { brands = [] } = data;
  return formatToCamelCase(brands);
};

export const fetchModelsByBrandId = async brandId => {
  if (!brandId) return [];
  const { data } = await api.get(`/cars/brands/${brandId}/models`);
  const { models = [] } = data;
  return formatToCamelCase(models);
};
