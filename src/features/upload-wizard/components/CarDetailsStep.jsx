import { Stack, Typography, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { getMakeOptions, getYearOptions } from '../utils/options';

const Root = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
}));

const FieldsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const CarDetailsStep = ({ errors, register, control, t }) => {
  const yearOptions = getYearOptions();
  const makeOptions = getMakeOptions();

  return (
    <Root>
      <Typography variant="h6">{t('uploadWizard.details.title', 'Car details')}</Typography>

      <Typography variant="body2" color="text.secondary">
        {t(
          'uploadWizard.details.description',
          'Providing these details helps our AI generate a more accurate estimate.'
        )}
      </Typography>

      <FieldsRow>
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
                  label={t('uploadWizard.details.make.label', 'Марка')}
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
          label={t('uploadWizard.details.model.label', 'Model')}
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
                  label={t('uploadWizard.details.year.label', 'Рік')}
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

      <FieldsRow sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={t('uploadWizard.details.mileage.label', 'Mileage (optional)')}
          placeholder={t('uploadWizard.details.mileage.placeholder', 'e.g., 50000')}
          {...register('mileage')}
          error={Boolean(errors.mileage)}
          helperText={errors.mileage?.message}
        />
      </FieldsRow>

      <TextField
        fullWidth
        multiline
        minRows={3}
        label={t('uploadWizard.details.damageContext.label', 'Damage context (optional)')}
        placeholder={t(
          'uploadWizard.details.damageContext.placeholder',
          'e.g., "The car was hit in a parking lot. The dent is on the rear passenger door."'
        )}
        {...register('damageContext')}
        error={Boolean(errors.damageContext)}
        helperText={errors.damageContext?.message}
      />
    </Root>
  );
};
