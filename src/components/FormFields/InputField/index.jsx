import { useFormContext, Controller } from 'react-hook-form';
import { FormLabel, InputAdornment, Typography, FormControl, IconButton, TextField } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState } from 'react';

export const InputField = ({
  name,
  placeholder,
  required,
  label,
  startIcon,
  type = 'text',
  fullWidth = true,
  useShowPassword = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isPasswordField = type === 'password';

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
            type={isPasswordField && showPassword ? 'text' : type}
            autoComplete="off"
            placeholder={placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...props}
            slotProps={{
              input: {
                startAdornment: startIcon || null,
                endAdornment:
                  isPasswordField && useShowPassword ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(s => !s)} edge="end">
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              },
            }}
            required={required}
          />
        )}
      />
    </FormControl>
  );
};
