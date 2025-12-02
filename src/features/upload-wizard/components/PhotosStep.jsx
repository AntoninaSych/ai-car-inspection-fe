import { Grid, Typography, Alert, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { PhotoUploadField } from './PhotoUploadField';
import { PHOTO_FIELDS } from '../constants';

export const PhotosStep = ({ t }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const photosGroupError = errors?.photosGroup?.message;
  const photoErrors = PHOTO_FIELDS.filter(field => errors[field.name]).map(field => ({
    name: field.name,
    message: errors[field.name]?.message,
    label: t(`${field.i18nKey}.label`),
  }));

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('photos.title', 'Upload photos of your car')}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {t('photos.subtitle', 'We will use these photos to estimate the cost of repairs. Please upload clear images.')}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 3, alignItems: 'flex-star' }}>
        {PHOTO_FIELDS.map(field => (
          <Grid key={field.name} size={{ xs: 12, md: field.size || 6 }}>
            <PhotoUploadField
              name={field.name}
              label={t(`${field.i18nKey}.label`)}
              helperText={t(`${field.i18nKey}.helper`)}
              required={field.required}
              t={t}
            />
          </Grid>
        ))}
      </Grid>

      {photoErrors.length > 0 && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {photoErrors.map(err => (
            <Box key={err.name}>
              {err.label}: {err.message}
            </Box>
          ))}
        </Alert>
      )}

      {photosGroupError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {photosGroupError}
        </Alert>
      )}
    </>
  );
};
