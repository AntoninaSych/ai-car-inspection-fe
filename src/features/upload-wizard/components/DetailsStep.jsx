import { Stack, Typography, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { getMakeOptions, getYearOptions } from '../utils/options';

const FieldsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const DetailsStep = ({ t }) => {
  const { control, register, formState } = useFormContext();
  const { errors } = formState;
  const yearOptions = getYearOptions();
  const makeOptions = getMakeOptions();

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
              options={makeOptions}
              getOptionLabel={option => option.label ?? ''}
              value={makeOptions.find(opt => opt.label === field.value) || null}
              onChange={(_, option) => field.onChange(option?.value || '')}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t('details.fields.make.label', 'Марка')}
                  error={!!errors.make}
                  helperText={errors.make?.message}
                  fullWidth
                  required
                />
              )}
              fullWidth
            />
          )}
        />

        <TextField
          fullWidth
          label={t('details.fields.model.label', 'Model')}
          required
          {...register('model')}
          error={Boolean(errors.model)}
          helperText={errors.model?.message}
        />

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={yearOptions}
              getOptionLabel={option => option.label ?? ''}
              value={yearOptions.find(opt => opt.value === field.value) || null}
              onChange={(_, option) => field.onChange(option?.value || '')}
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

      <FieldsRow>
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
