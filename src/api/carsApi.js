import api from './axiosInstance';

const formatFetchCarBrandsResponse = data => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    yearFrom: item.year_from,
    yearTo: item.year_to,
    numericId: item.numeric_id,
    cyrillicName: item.cyrillic_name,
  }));
};

const formatFetchModelsByBrandIdResponse = data => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    yearFrom: item.year_from,
    yearTo: item.year_to,
    cyrillicName: item.cyrillic_name,
  }));
};

export const fetchCarBrands = async search => {
  const { data } = await api.get('/cars/brands', { params: { search } });
  const { brands = [] } = data;

  return formatFetchCarBrandsResponse(brands);
};

export const fetchModelsByBrandId = async brandId => {
  if (!brandId) return [];
  const { data } = await api.get(`/cars/brands/${brandId}/models`);
  const { models = [] } = data;

  return formatFetchModelsByBrandIdResponse(models);
};
