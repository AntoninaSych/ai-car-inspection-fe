import { useMemo, useRef } from 'react';
import { Stack, Typography, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
  const inputRef = useRef(null);
  const { setValue, watch } = useFormContext();
  const file = watch(name);
  const photoId = `photo-input-${name}`;

  const { dropRef, isDragging } = useDropZone({
    onDropFile: file => {
      setValue(name, file, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
  });
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleFileChange = event => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setValue(name, file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleOnRemove = () => {
    setValue(name, null, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFileClick = () => {
    const input = document.getElementById(photoId);
    if (input) {
      input.click();
    }
  };

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      {previewUrl && <PhotoCard image={previewUrl} label={label} onClose={handleOnRemove} />}

      {!previewUrl && (
        <DragContentInner
          ref={dropRef}
          data-dragging={isDragging ? 'true' : 'false'}
          onClick={handleFileClick}
          sx={{ height: '100%' }}
        >
          <CardContent>
            <input ref={inputRef} id={photoId} type="file" accept="image/*" onChange={handleFileChange} hidden />
            <CloudUploadIcon sx={{ fontSize: 46 }} />
            <Typography variant="body1" color="primary.light" align="center">
              {t('dragOverlay.title')}
            </Typography>
            <Typography variant="h6">
              {label}
              {required && ' *'}
            </Typography>
            <Typography variant="body2">{helperText || 'Upload a clear photo.'}</Typography>
            <Typography variant="body2" color="neutral.600" align="center">
              ({t('dragOverlay.subtitle', 'Maximum file size 5MB.', { size: MAX_FILE_SIZE_MB })})
            </Typography>
          </CardContent>
        </DragContentInner>
      )}
    </Stack>
  );
};
