import { useMemo } from 'react';
import { Stack, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const PhotoStepRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const PreviewCard = styled(Card)(() => ({
  maxWidth: 320,
  margin: '0 auto',
}));

export const PhotoStep = ({ name, label, helperText, value, setValue, t, error }) => {
  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  const handleFileChange = event => {
    const file = event.target.files?.[0] || null;
    setValue(name, file, { shouldValidate: true });
  };

  return (
    <PhotoStepRoot>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body2">
        {helperText || `Upload a clear photo of the ${label.toLowerCase()} of your car.`}
      </Typography>

      {previewUrl && (
        <PreviewCard>
          <CardMedia component="img" image={previewUrl} alt={label} />
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" color="primary.main" fontWeight="600" align="center">
              {t('uploadWizard.preview', 'Preview')}
            </Typography>
          </CardContent>
        </PreviewCard>
      )}

      <Button variant="outlined" component="label">
        {t('uploadWizard.buttons.choose_photo', 'Choose photo')}
        <input type="file" accept="image/*" onChange={handleFileChange} hidden />
      </Button>

      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </PhotoStepRoot>
  );
};
