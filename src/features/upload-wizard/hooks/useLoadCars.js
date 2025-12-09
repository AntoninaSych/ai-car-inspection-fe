import { useQuery } from '@tanstack/react-query';
import { fetchCarBrands, fetchModelsByBrandId } from '../../../api/carsApi';
import { getYearOptions } from '../utils/options';
import { useMemo } from 'react';

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
    staleTime: 1000 * 60 * 15, // cache 15 minutes
  });

  const {
    data: models = [],
    isLoading: isModelsLoading,
    isError: isModelsError,
  } = useQuery({
    queryKey: ['models', selectedBrandId],
    queryFn: () => fetchModelsByBrandId(selectedBrandId),
    enabled: !!selectedBrandId,
    staleTime: 1000 * 60 * 15, // cache 15 minutes
  });

  const yearOptions = useMemo(() => {
    const foundModel = models.find(model => model.id === selectedModelId);
    return foundModel ? getYearOptions(foundModel.yearFrom, foundModel.yearTo) : [];
  }, [models, selectedModelId]);

  const brandOptions = useMemo(
    () =>
      brands.map(brand => ({
        id: brand.id,
        label: brand.name,
      })),
    [brands]
  );

  const modelOptions = useMemo(
    () =>
      models.map(model => ({
        id: model.id,
        label: model.name,
      })),
    [models]
  );

  return {
    isBrandsLoading,
    isModelsLoading,
    brandOptions,
    modelOptions,
    yearOptions,
    isLoading: isBrandsLoading || isModelsLoading,
    isError: isBrandsError || isModelsError,
  };
};
