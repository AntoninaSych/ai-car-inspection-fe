import { useFormContext, Controller } from 'react-hook-form';
import { FormLabel, Typography, FormControl, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

export const CheckboxField = ({
  name,
  label,
  required = false,
  fullWidth = true,
  helperText,
  checkboxProps,
  labelProps,
  ...formControlProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name];
  const errorMessage = error?.message;

  return (
    <FormControl fullWidth={fullWidth} error={Boolean(error)} {...formControlProps}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <FormControlLabel
              {...labelProps}
              label={label}
              control={
                <Checkbox
                  {...checkboxProps}
                  id={name}
                  name={field.name}
                  inputRef={field.ref}
                  checked={Boolean(field.value)}
                  onBlur={field.onBlur}
                  onChange={e => field.onChange(e.target.checked)}
                />
              }
            />
          );
        }}
      />

      {(errorMessage || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
    </FormControl>
  );
};
