import { useMemo } from 'react';
import { Stack, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const PhotoStepRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const PreviewCard = styled(Card)(() => ({
  maxWidth: 320,
}));

export const PhotoStep = ({ name, label, helperText, value, setValue, error }) => {
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

      <Button variant="outlined" component="label">
        Choose photo
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
      </Button>

      {previewUrl && (
        <PreviewCard>
          <CardMedia component="img" image={previewUrl} alt={label} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Preview — {name}
            </Typography>
          </CardContent>
        </PreviewCard>
      )}

      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </PhotoStepRoot>
  );
};
