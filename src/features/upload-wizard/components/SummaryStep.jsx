import { Stack, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { PHOTO_FIELDS } from '../constants';
import { PhotoCard } from './PhotoCard';

const SummaryRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const SummaryRow = ({ label, value }) => (
  <Box display="flex" gap={1} mb={0.5}>
    <Typography variant="body2" color="text.secondary">
      {label}:
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

export const SummaryStep = ({ t }) => {
  const { watch } = useFormContext();
  const values = watch();

  return (
    <SummaryRoot>
      <Typography variant="h6">{t('summary.title', 'Review your information')}</Typography>

      <Typography variant="body2" color="text.secondary">
        {t('summary.description', 'Please make sure that the provided details and uploaded photos are correct.')}
      </Typography>

      <Stack>
        <Typography variant="h6" gutterBottom>
          {t('summary.sections.details.title', 'Vehicle Information')}
        </Typography>
        <SummaryRow label={t('details.fields.make.label', 'Make')} value={values.make?.label} />
        <SummaryRow label={t('details.fields.model.label', 'Make')} value={values.model?.label} />
        <SummaryRow label={t('details.fields.year.label', 'Year')} value={values.year?.label} />
        <SummaryRow label={t('details.fields.country.label', 'Country')} value={values.country?.label} />
        {values.mileage && <SummaryRow label={t('details.fields.mileage.label', 'Mileage')} value={values.mileage} />}
        {values.description && (
          <SummaryRow label={t('details.fields.description.label', 'Damage context')} value={values.description} />
        )}
      </Stack>

      <Typography variant="h6" gutterBottom>
        {t('summary.sections.photos.title', 'Photos')}
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'flex-star' }}>
        {PHOTO_FIELDS.map(field => {
          const file = values[field.name] || null;

          if (!file) {
            return null;
          }

          const url = URL.createObjectURL(file);
          const label = t(`${field.i18nKey}.label`);

          return (
            <Grid key={field.name} size={{ xs: 12, md: 6 }}>
              <PhotoCard image={url} label={label} file={file.name} />
            </Grid>
          );
        })}
      </Grid>
    </SummaryRoot>
  );
};
