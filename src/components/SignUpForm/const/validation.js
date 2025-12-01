import * as yup from 'yup';
import { text } from '../../../utils/validation';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, text.min(3))
    .max(50, text.max(50))
    .required(text.required()),
  email: yup
    .string()
    .min(5, text.min(5))
    .max(50, text.max(50))
    .email('Should be correct email')
    .required(text.required()),
  password: yup
    .string()
    .min(6, text.min(6))
    .max(18, text.max(18))
    .required(text.required()),
});
