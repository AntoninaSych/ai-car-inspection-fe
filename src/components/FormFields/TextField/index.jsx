import { TextField as MUITextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const TextField = ({ name, rules = {}, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <MUITextField {...props} {...register(name, rules)} error={!!errors[name]} helperText={errors[name]?.message} />
  );
};
