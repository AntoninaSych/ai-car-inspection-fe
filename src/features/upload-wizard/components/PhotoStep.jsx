import { useMemo } from 'react';
import { Stack, Typography, Card, CardContent, CardMedia, IconButton, Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Trans } from 'react-i18next';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useDropZone } from '../hooks/useDropZone';
import { ContentInner, DragContentInner } from '../styled';
import { MAX_FILE_SIZE_MB } from '../validation/schema';

const PhotoStepRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const PreviewCard = styled(Card)(() => ({
  maxWidth: 320,
  margin: '0 auto',
  position: 'relative',
}));

const RemoveBtn = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(4px)',
  color: '#fff',
  padding: 4,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
}));

export const PhotoStep = ({ name, label, helperText, value, setValue, t, error }) => {
  const { dropRef, isDragging } = useDropZone({
    onDropFile: file => {
      setValue(name, file, { shouldValidate: true });
    },
  });
  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  const handleFileChange = event => {
    const file = event.target.files?.[0] || null;
    setValue(name, file, { shouldValidate: true });
  };

  const handleOnRemove = () => {
    setValue(name, null, { shouldValidate: true });
  };

  const handleFileClick = () => {
    const input = document.getElementById('photo-input');
    if (input) {
      input.click();
    }
  };

  return (
    <PhotoStepRoot>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body2">
        {helperText || `Upload a clear photo of the ${label.toLowerCase()} of your car.`}
      </Typography>

      <DragContentInner ref={dropRef} data-dragging={isDragging ? 'true' : 'false'} onClick={handleFileClick}>
        <ContentInner>
          <input id="photo-input" type="file" accept="image/*" onChange={handleFileChange} hidden />
          <CloudUploadIcon sx={{ fontSize: 46 }} />
          <Typography variant="body1" color="text.secondary" align="center">
            <Trans i18nKey="uploadWizard.dragOverlay.title">
              <Box component="strong" color="primary.light">
                Click to upload
              </Box>
              or Drag a photo here
            </Trans>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('uploadWizard.dragOverlay.subtitle', 'Maximum file size 5MB.', { size: MAX_FILE_SIZE_MB })}
          </Typography>
        </ContentInner>
      </DragContentInner>

      {previewUrl && (
        <PreviewCard>
          <RemoveBtn size="small" onClick={handleOnRemove}>
            <CloseIcon fontSize="small" />
          </RemoveBtn>
          <CardMedia component="img" image={previewUrl} alt={label} />
          <CardContent sx={{ py: 3 }}>
            <Typography variant="body2" color="primary.main" fontWeight="600" align="center">
              {t('uploadWizard.preview', 'Preview')}
            </Typography>
          </CardContent>
        </PreviewCard>
      )}

      {error && <Alert severity="error">{error.message}</Alert>}
    </PhotoStepRoot>
  );
};
