import * as yup from 'yup';

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const formats = SUPPORTED_FORMATS.join(', ');

const createFileSchema = t =>
  yup
    .mixed()
    .nullable()
    .optional()
    .test('fileSize', t('validation.fileSize', { size: MAX_FILE_SIZE_MB }), file => {
      if (!file) {
        return true;
      }
      return file.size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', t('validation.fileFormat', { formats }), file => {
      if (!file) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(file.type);
    });

export const createUploadWizardSchema = t =>
  yup.object({
    make: yup.string().required(t(`validation.required`)),
    model: yup.string().required(t(`validation.required`)),
    year: yup
      .number()
      .required(t(`validation.required`))
      .typeError(t(`validation.required`))
      .integer(t(`validation.integer`))
      .positive(t(`validation.positive`))
      .min(1980)
      .max(new Date().getFullYear() + 1),
    mileage: yup.string().optional().nullable(),
    damageContext: yup
      .string()
      .max(1000, t(`validation.max`, { value: 1000 }))
      .nullable()
      .optional(),
    front: createFileSchema(t),
    rear: createFileSchema(t),
    left: createFileSchema(t),
    right: createFileSchema(t),
    email: yup.string().required(t(`validation.required`)).email(t('validation.invalidEmail')),
  });
