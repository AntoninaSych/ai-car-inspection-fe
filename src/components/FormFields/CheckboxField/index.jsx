import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

export const CheckboxField = ({
  name,
  label,
  helperText,
  checkboxProps,
  labelProps,
  required = false,
  fullWidth = true,
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
                  required={required}
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
