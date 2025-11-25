import { Stack, Typography, TextField, Button, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UPLOAD_STEPS } from '../config';

const SummaryRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
}));

const PhotosRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const PreviewCard = styled(Card)(() => ({
  maxWidth: 200,
}));

const EmailField = styled(TextField)(({ theme }) => ({
  maxWidth: 360,
}));

const allSteps = [UPLOAD_STEPS.FRONT, UPLOAD_STEPS.REAR, UPLOAD_STEPS.LEFT, UPLOAD_STEPS.RIGHT];

export const SummaryStep = ({ values, errors, isSubmitting, onEmailChange, onSubmit, t }) => {
  const requiredPhotosFilled = values.front && values.rear && values.left && values.right;

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
        {allSteps.map(side => {
          const file = values[side];
          if (!file) return null;

          const previewUrl = URL.createObjectURL(file);

          return (
            <PreviewCard key={side}>
              <CardMedia component="img" image={previewUrl} alt={side} />
              <CardContent>
                <Typography variant="body2" textTransform="capitalize">
                  {side}
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
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitting || !requiredPhotosFilled}>
          {isSubmitting
            ? t('uploadWizard.summary.sending', 'Sending...')
            : t('uploadWizard.summary.sendButton', 'Send for AI analysis')}
        </Button>

        {!requiredPhotosFilled && (
          <Typography variant="caption" color="warning.main">
            {t('uploadWizard.summary.missingPhotos', 'Please upload all required photos before sending.')}
          </Typography>
        )}
      </Stack>
    </SummaryRoot>
  );
};
