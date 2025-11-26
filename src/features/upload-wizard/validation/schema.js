import * as yup from 'yup';

// max 5 MB
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

const createFileSchema = t =>
  yup
    .mixed()
    .required(t(`errors.upload.required`))
    .test('fileSize', t('errors.upload.fileSize', { size: MAX_FILE_SIZE_MB }), value => {
      if (!value) return false;
      return value.size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', t('errors.upload.fileFormat'), value => {
      if (!value) return false;
      return SUPPORTED_FORMATS.includes(value.type);
    });

export const createUploadWizardSchema = t =>
  yup.object({
    front: createFileSchema(t, 'front'),
    rear: createFileSchema(t, 'rear'),
    left: createFileSchema(t, 'left'),
    right: createFileSchema(t, 'right'),
    email: yup.string().nullable().optional().email(t('errors.upload.invalidEmail')),
  });
