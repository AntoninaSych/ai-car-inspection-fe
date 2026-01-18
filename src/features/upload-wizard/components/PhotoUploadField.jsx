import { useMemo, useRef } from 'react';
import { Stack, Typography, CardContent, Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDropZone } from '../hooks/useDropZone';
import { MAX_FILE_SIZE_MB } from '../validation/schema';
import { PhotoCard } from './PhotoCard';

export const DragContentInner = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${theme.palette.divider}`,
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  minHeight: 145,
  transition: 'background-color 0.15s ease, border 0.15s ease',
  '&[data-dragging="true"]': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const PhotoUploadField = ({ name, label, helperText, required, t }) => {
  const desktopInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const { setValue, watch } = useFormContext();
  const file = watch(name);

  const resetInputs = () => {
    if (desktopInputRef.current) desktopInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleFileResult = file => {
    if (file) {
      setValue(name, file, { shouldValidate: true, shouldDirty: true });
    }
    resetInputs();
  };

  const { dropRef, isDragging } = useDropZone({
    onDropFile: handleFileResult,
  });

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleFileChange = event => {
    const file = event.target.files?.[0] || null;
    handleFileResult(file);
  };

  const handleOnRemove = () => {
    setValue(name, null, { shouldValidate: true, shouldDirty: true });
    resetInputs();
  };

  const handleZoneClick = () => {
    if (desktopInputRef.current) {
      desktopInputRef.current.click();
    }
  };

  const handleCameraClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const stopEventPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      <input
        ref={desktopInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {previewUrl && <PhotoCard image={previewUrl} label={label} onClose={handleOnRemove} />}

      {!previewUrl && (
        <DragContentInner
          ref={dropRef}
          data-dragging={isDragging ? 'true' : 'false'}
          onClick={handleZoneClick}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CloudUploadIcon sx={{ fontSize: 46, color: 'primary.main' }} />

            <Typography variant="body1" color="primary.light" align="center">
              {t('dragOverlay.title')}
            </Typography>

            <Typography variant="h6">
              {label} {required && ' *'}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {helperText || t('dragOverlay.defaultHelper', 'Upload a clear photo.')}
            </Typography>

            <Box
              onClick={stopEventPropagation}
              onMouseDown={stopEventPropagation}
              onTouchStart={stopEventPropagation}
              sx={{
                mt: 1,
                width: '100%',
                maxWidth: 200,
                display: { xs: 'block', sm: 'none' },
                zIndex: 20,
                position: 'relative',
              }}
            >
              <Divider sx={{ my: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                {t('dragOverlay.or', 'OR')}
              </Divider>

              <Button
                variant="outlined"
                startIcon={<CameraAltIcon />}
                onClick={handleCameraClick}
                fullWidth
                size="small"
                sx={{
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                {t('buttons.takePhoto', 'Take Photo')}
              </Button>
            </Box>

            <Typography variant="body2" color="neutral.700" align="center" sx={{ mt: 1 }}>
              ({t('dragOverlay.subtitle', 'Maximum file size 5MB.', { size: MAX_FILE_SIZE_MB })})
            </Typography>
          </CardContent>
        </DragContentInner>
      )}
    </Stack>
  );
};
