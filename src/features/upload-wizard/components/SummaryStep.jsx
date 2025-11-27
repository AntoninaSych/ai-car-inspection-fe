import { Stack, Typography, TextField, Button, Card, CardMedia, CardContent, Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

const SummaryRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const PhotosRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const PreviewCard = styled(Card)(() => ({
  maxWidth: 200,
}));

const EmailField = styled(TextField)(() => ({
  maxWidth: 360,
}));

const ImageWrapper = styled('div')({
  width: 200,
  height: 150,
  overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const SummaryStep = ({ values, errors, isSubmitting, stepsWithLabels, onEmailChange, onSubmit, t }) => {
  const requiredPhotos = ['front', 'rear', 'left', 'right'];
  const requiredPhotosFilled = requiredPhotos.every(photo => !!values[photo]);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <SummaryRoot>
      <Typography variant="h6">{t('uploadWizard.summary.title', 'Summary')}</Typography>

      <Typography variant="body2" color="text.secondary">
        {t(
          'uploadWizard.summary.description',
          'Please check your photos and optionally leave your email to receive the estimate.'
        )}
      </Typography>

      <PhotosRow>
        {Object.keys(values).map(fieldName => {
          const file = values[fieldName];
          if (file instanceof File) {
            const label = stepsWithLabels.find(({ id }) => id === fieldName)?.label;
            const previewUrl = URL.createObjectURL(file);

            return (
              <PreviewCard key={fieldName}>
                <ImageWrapper>
                  <StyledCardMedia component="img" image={previewUrl} alt={label} />
                </ImageWrapper>
                <CardContent>
                  <Typography variant="body2" textTransform="capitalize" color="primary.main" fontWeight="600">
                    {label}
                  </Typography>
                </CardContent>
              </PreviewCard>
            );
          }
        })}
      </PhotosRow>

      <EmailField
        label={t('uploadWizard.fields.email.label', 'Email')}
        type="email"
        size="small"
        value={values.email || ''}
        onChange={e => onEmailChange(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <Stack gap={1}>
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitting || hasErrors}>
          {isSubmitting
            ? t('uploadWizard.summary.sending', 'Sending...')
            : t('uploadWizard.summary.sendButton', 'Send for AI analysis')}
        </Button>

        {!requiredPhotosFilled && (
          <Alert severity="warning">
            <AlertTitle>
              {t('uploadWizard.summary.missingPhotos', 'Please upload all required photos before sending.')}
            </AlertTitle>
          </Alert>
        )}

        {hasErrors && (
          <Alert severity="warning">
            <AlertTitle>{t('uploadWizard.summary.errorsTitle', 'Please fix the following errors')}</AlertTitle>
            <ul>
              {Object.keys(errors).map(fieldName => {
                const message = errors[fieldName]?.message;
                if (message && !requiredPhotos.includes(fieldName)) {
                  return (
                    <li key={fieldName}>
                      <strong>{t(`uploadWizard.fields.${fieldName}.label`)}:</strong> {message}
                    </li>
                  );
                }
              })}
            </ul>
          </Alert>
        )}
      </Stack>
    </SummaryRoot>
  );
};
