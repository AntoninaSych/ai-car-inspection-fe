import * as yup from 'yup';

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const formats = SUPPORTED_FORMATS.join(', ');

const createFileSchema = t =>
  yup
    .mixed()
    .required(t(`errors.upload.required`))
    .test('fileSize', t('errors.upload.fileSize', { size: MAX_FILE_SIZE_MB }), file => {
      if (!file) return false;
      return file.size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', t('errors.upload.fileFormat', { formats }), file => {
      if (!file) {
        return false;
      }
      return SUPPORTED_FORMATS.includes(file.type);
    });

export const createUploadWizardSchema = t =>
  yup.object({
    make: yup.string().required(t(`errors.upload.required`)),
    model: yup.string().required(t(`errors.upload.required`)),
    year: yup
      .number()
      .required(t(`errors.upload.required`))
      .typeError(t(`errors.upload.required`))
      .integer(t(`errors.upload.integer`))
      .positive(t(`errors.upload.positive`))
      .min(1980)
      .max(new Date().getFullYear() + 1),
    mileage: yup.string().optional().nullable(),
    damageContext: yup
      .string()
      .max(1000, t(`errors.upload.max`, { value: 1000 }))
      .nullable()
      .optional(),
    front: createFileSchema(t),
    rear: createFileSchema(t),
    left: createFileSchema(t),
    right: createFileSchema(t),
    email: yup.string().required(t(`errors.upload.required`)).email(t('errors.upload.invalidEmail')),
  });
