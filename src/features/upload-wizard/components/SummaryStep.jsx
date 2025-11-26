import { Stack, Typography, TextField, Button, Card, CardMedia, CardContent, Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import { REQUIRED_STEPS } from '../config';

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
  const requiredPhotosFilled = values.front && values.rear && values.left && values.right;
  const hasErrors = REQUIRED_STEPS.some(step => !!errors[step]);

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
        {REQUIRED_STEPS.map(side => {
          const file = values[side];
          if (!file) {
            return null;
          }

          const label = stepsWithLabels.find(({ id }) => id === side)?.label;
          const previewUrl = URL.createObjectURL(file);

          return (
            <PreviewCard key={side}>
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
        })}
      </PhotosRow>

      <EmailField
        label={t('uploadWizard.summary.emailLabel', 'Email (optional)')}
        type="email"
        size="small"
        value={values.email || ''}
        onChange={e => onEmailChange(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <Stack gap={1}>
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitting || hasErrors || !requiredPhotosFilled}>
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
          <Alert severity="error">
            <AlertTitle>{t('uploadWizard.summary.errorsTitle', 'Please fix photo errors')}</AlertTitle>
            <ul>
              {Object.keys(errors).map(side => {
                const message = errors[side]?.message;
                const hasStepError = REQUIRED_STEPS.includes(side);
                if (message && hasStepError) {
                  return (
                    <li key={side}>
                      <strong>{t(`uploadWizard.steps.${side}.label`)}:</strong> {message}
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
