import { useFormContext, Controller } from 'react-hook-form';
import { FormLabel, InputAdornment, Typography, FormControl, TextField } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export const EmailField = ({ name, label, placeholder, required, startIcon, fullWidth = true, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl fullWidth={fullWidth} error={!!errors[name]}>
      {label && (
        <FormLabel htmlFor={name}>
          {label} {required && <Typography component="span">*</Typography>}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            placeholder={placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...props}
            slotProps={{
              input: {
                startAdornment: startIcon || (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ opacity: 0.7 }} />
                  </InputAdornment>
                ),
              },
            }}
            required={required}
          />
        )}
      />
    </FormControl>
  );
};
