import * as yup from 'yup';

export const uploadWizardSchema = yup.object({
  front: yup.mixed().required('Front photo is required'),
  rear: yup.mixed().required('Rear photo is required'),
  left: yup.mixed().required('Left side photo is required'),
  right: yup.mixed().required('Right side photo is required'),
  email: yup.string().email('Invalid email').nullable().optional(),
});
