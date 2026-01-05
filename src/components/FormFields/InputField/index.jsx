import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormLabel, InputAdornment, Typography, FormControl, IconButton, TextField, Box, Stack } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { PASSWORD_MIN } from '../../../constants';

const checkPasswordRules = (t, value) => {
  function validatePasswordRules(password) {
    const min = (password?.length ?? 0) >= PASSWORD_MIN;
    const hasNumber = /\d/.test(password || '');
    return { min, hasNumber };
  }

  const rules = validatePasswordRules(value);

  return (
    <Box sx={{ mt: 0.5, mb: 1, display: 'grid', gap: 0.5 }}>
      <RuleRow ok={rules.min} label={t('common:validation.minString', { value: PASSWORD_MIN })} />
      <RuleRow ok={rules.hasNumber} label={t('common:validation.matches.digit')} />
    </Box>
  );
};

export const InputField = ({
  name,
  placeholder,
  required,
  label,
  startIcon,
  type = 'text',
  fullWidth = true,
  useShowPassword = true,
  showRules = false,
  showError = true,
  ...props
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isPasswordField = type === 'password';
  const defaultType = isPasswordField && showPassword ? 'text' : type;

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
        render={({ field, fieldState }) => {
          return (
            <Stack gap={1}>
              <TextField
                {...field}
                type={defaultType}
                autoComplete="off"
                placeholder={placeholder}
                error={!!fieldState.error}
                helperText={showError && fieldState.error?.message}
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
              {isPasswordField && showRules && checkPasswordRules(t, field.value)}
            </Stack>
          );
        }}
      />
    </FormControl>
  );
};

function RuleRow({ ok, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {ok ? (
        <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 14 }} />
      ) : (
        <CancelOutlinedIcon sx={{ color: 'text.disabled', fontSize: 14 }} />
      )}
      <Typography sx={{ fontSize: 12, color: ok ? 'text.primary' : 'text.disabled' }}>{label}</Typography>
    </Box>
  );
}
