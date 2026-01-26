import * as yup from 'yup';

export const MAX_FILE_SIZE_MB = 10;
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
    make: yup
      .object({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
      .required(t(`validation.required`))
      .typeError(t('validation.required')),
    model: yup
      .object({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
      .required(t(`validation.required`))
      .typeError(t('validation.required')),
    year: yup
      .object({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
      .required(t(`validation.required`))
      .typeError(t('validation.required')),
    country: yup
      .object({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
      .required(t(`validation.required`))
      .typeError(t('validation.required')),
    mileage: yup.string().optional().nullable(),
    description: yup
      .string()
      .max(1000, t(`validation.max`, { value: 1000 }))
      .nullable()
      .optional(),
    front: createFileSchema(t),
    rear: createFileSchema(t),
    left: createFileSchema(t),
    right: createFileSchema(t),
    extra: createFileSchema(t),
    photosGroup: yup.mixed().test('at-least-one-photo', t('validation.oneImageRequired'), function () {
      const { front, rear, left, right, extra } = this.parent;
      const files = [front, rear, left, right, extra];
      return files.some(field => field instanceof File);
    }),
  });
