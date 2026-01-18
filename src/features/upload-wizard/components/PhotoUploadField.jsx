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
  // Refs для прямого доступу до input-ів
  const desktopInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const { setValue, watch } = useFormContext();
  const file = watch(name);

  // Функція для скидання значень інпутів
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

  // --- ЛОГІКА ОБРОБКИ КЛІКІВ ---

  // 1. Клік по великій зоні (Desktop/Gallery)
  const handleZoneClick = e => {
    // Якщо клік був десь на зоні, викликаємо звичайний інпут
    if (desktopInputRef.current) {
      desktopInputRef.current.click();
    }
  };

  // 2. Клік по кнопці Камери (Mobile)
  const handleCameraClick = e => {
    // Зупиняємо, щоб не спрацював handleZoneClick
    e.preventDefault();
    e.stopPropagation();

    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  // 3. "Вогняна стіна" - функція, яка вбиває будь-яку подію
  const killEvent = e => {
    e.stopPropagation();
  };

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      {/* --- ПРИХОВАНІ INPUTS --- */}
      {/* Вони винесені сюди, щоб не залежати від верстки */}

      {/* Інпут 1: Звичайний (для кліку по фону) */}
      <input
        ref={desktopInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Інпут 2: Тільки Камера (capture="environment") */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* --- ВІДОБРАЖЕННЯ --- */}

      {previewUrl && <PhotoCard image={previewUrl} label={label} onClose={handleOnRemove} />}

      {!previewUrl && (
        <DragContentInner
          ref={dropRef}
          data-dragging={isDragging ? 'true' : 'false'}
          onClick={handleZoneClick} // <--- Клік по зоні відкриває Галерею
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
              {helperText || 'Upload a clear photo.'}
            </Typography>

            {/* --- КНОПКА КАМЕРИ (ІЗОЛЬОВАНА) --- */}
            <Box
              // Цей блок - ізолятор. Він ловить всі кліки на собі і не пускає їх до DragContentInner
              onClick={killEvent}
              onMouseDown={killEvent}
              onTouchStart={killEvent}
              sx={{
                mt: 1,
                width: '100%',
                maxWidth: 200,
                display: { xs: 'block', sm: 'none' }, // Тільки мобільні
                zIndex: 20, // Поверх усього
                position: 'relative',
              }}
            >
              <Divider sx={{ my: 1, fontSize: '0.75rem', color: 'text.secondary' }}>OR</Divider>

              <Button
                variant="outlined"
                startIcon={<CameraAltIcon />}
                onClick={handleCameraClick} // Викликаємо саме камеру
                fullWidth
                size="small"
                sx={{
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                Take Photo
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
