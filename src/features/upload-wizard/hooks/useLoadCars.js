import { useQuery } from '@tanstack/react-query';
import { fetchCarBrands, fetchModelsByBrandId } from '../../../api/carsApi';
import { getYearOptions } from '../utils/options';

export const useLoadCars = ({ selectedBrand = null, selectedModel = null, search = '' }) => {
  const selectedBrandId = selectedBrand?.id;
  const selectedModelId = selectedModel?.id;

  const {
    data: brands = [],
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () => fetchCarBrands(search),
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: models = [],
    isLoading: isModelsLoading,
    isError: isModelsError,
  } = useQuery({
    queryKey: ['models', selectedBrandId],
    queryFn: () => fetchModelsByBrandId(selectedBrandId),
    enabled: !!selectedBrandId,
    staleTime: 1000 * 60 * 10,
  });

  const brandOptions = brands.map(brand => ({
    id: brand.id,
    label: brand.name,
  }));

  const modelOptions = models.map(model => ({
    id: model.id,
    label: model.name,
  }));

  const foundModel = models.find(model => model.id === selectedModelId);
  const yearOptions = foundModel ? getYearOptions(foundModel.yearFrom, foundModel.yearTo) : [];

  return {
    isLoading: isBrandsLoading || isModelsLoading,
    isBrandsLoading,
    isModelsLoading,
    isError: isBrandsError || isModelsError,
    brandOptions,
    modelOptions,
    yearOptions,
  };
};
