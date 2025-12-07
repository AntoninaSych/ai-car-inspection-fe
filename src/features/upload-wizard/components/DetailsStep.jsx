import { Stack, Typography, TextField, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { useLoadCars } from '../hooks/useLoadCars';
import { COUNTRY_CODES } from '../constants';

const FieldsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const DetailsStep = ({ t }) => {
  const { control, register, formState, watch } = useFormContext();
  const { errors } = formState;
  const selectedBrand = watch('make');
  const selectedModel = watch('model');
  const { isBrandsLoading, isModelsLoading, modelOptions, brandOptions, yearOptions } = useLoadCars({
    selectedBrand,
    selectedModel,
  });

  const countryOptions = COUNTRY_CODES.map(code => ({
    id: code,
    label: t(`countries.${code}`),
  }));

  return (
    <Stack gap={2}>
      <Typography variant="h6">{t('details.title', 'Car details')}</Typography>
      <Typography variant="body2" color="text.secondary">
        {t('details.description', 'Providing these details helps our AI generate a more accurate estimate.')}
      </Typography>

      <FieldsRow gap={2}>
        <Controller
          name="make"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={brandOptions}
              getOptionLabel={option => option.label ?? ''}
              value={brandOptions.find(opt => opt.id === field.value.id) || null}
              onChange={(_, option) => field.onChange(option || '')}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t('details.fields.make.label', 'Марка')}
                  error={!!errors.make}
                  helperText={errors.make?.message}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isBrandsLoading && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps?.endAdornment}
                        </>
                      ),
                    },
                  }}
                  fullWidth
                  required
                />
              )}
              fullWidth
            />
          )}
        />

        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={modelOptions}
              getOptionLabel={option => option.label ?? ''}
              value={modelOptions.find(opt => opt.id === field.value.id) || null}
              onChange={(_, option) => field.onChange(option || '')}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t('details.fields.model.label', 'Model')}
                  error={!!errors.model}
                  helperText={errors.model?.message}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isModelsLoading && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps?.endAdornment}
                        </>
                      ),
                    },
                  }}
                  required
                  fullWidth
                />
              )}
              fullWidth
            />
          )}
        />

        {/*<TextField*/}
        {/*  fullWidth*/}
        {/*  label={t('details.fields.model.label', 'Model')}*/}
        {/*  required*/}
        {/*  {...register('model')}*/}
        {/*  error={Boolean(errors.model)}*/}
        {/*  helperText={errors.model?.message}*/}
        {/*/>*/}

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={yearOptions}
              getOptionLabel={option => option.label ?? ''}
              value={yearOptions.find(opt => opt.id === field.value.id) || null}
              onChange={(_, option) => field.onChange(option || '')}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t('details.fields.year.label', 'Рік')}
                  error={!!errors.year}
                  helperText={errors.year?.message}
                  required
                  fullWidth
                />
              )}
              fullWidth
            />
          )}
        />
      </FieldsRow>

      <FieldsRow gap={2}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={countryOptions}
              getOptionLabel={option => option.label ?? ''}
              value={countryOptions.find(opt => opt.id === field.value.id) || null}
              onChange={(_, option) => field.onChange(option || '')}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t('details.fields.country.label', 'Country')}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  required
                  fullWidth
                />
              )}
              fullWidth
            />
          )}
        />
        <TextField
          fullWidth
          label={t('details.fields.mileage.label', 'Mileage (optional)')}
          placeholder={t('details.fields.mileage.placeholder', 'e.g., 50000')}
          {...register('mileage')}
          error={Boolean(errors.mileage)}
          helperText={errors.mileage?.message}
        />
      </FieldsRow>

      <TextField
        fullWidth
        multiline
        minRows={3}
        label={t('details.fields.description.label', 'Damage context (optional)')}
        placeholder={t(
          'details.fields.description.placeholder',
          'e.g., "The car was hit in a parking lot. The dent is on the rear passenger door."'
        )}
        {...register('description')}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
      />
    </Stack>
  );
};
