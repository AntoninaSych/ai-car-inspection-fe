import { Stack, Typography, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getYearOptions } from '../utils/options';

const Root = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
}));

const FieldsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

// simple mock – then replace with real lists
const MAKE_OPTIONS = [
  { label: 'Audi', value: 'Audi' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Chevrolet', value: 'Chevrolet' },
  { label: 'Ford', value: 'Ford' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Jeep', value: 'Jeep' },
  { label: 'Kia', value: 'Kia' },
  { label: 'Lexus', value: 'Lexus' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Subaru', value: 'Subaru' },
  { label: 'Tesla', value: 'Tesla' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Volkswagen', value: 'Volkswagen' },
];

export const CarDetailsStep = ({ errors, register, t }) => {
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
        <TextField
          fullWidth
          select
          label={t('uploadWizard.details.make.label', 'Make')}
          required
          {...register('make')}
          error={Boolean(errors.make)}
          helperText={errors.make?.message}
        >
          {MAKE_OPTIONS.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label={t('uploadWizard.details.model.label', 'Model')}
          required
          {...register('model')}
          error={Boolean(errors.model)}
          helperText={errors.model?.message}
        />

        <TextField
          fullWidth
          select
          label={t('uploadWizard.details.year.label', 'Year')}
          required
          {...register('year')}
          error={Boolean(errors.year)}
          helperText={errors.year?.message}
        >
          {getYearOptions().map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </FieldsRow>

      <FieldsRow>
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
