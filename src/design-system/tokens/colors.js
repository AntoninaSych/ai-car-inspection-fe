export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927',
};

export const basePalette = {
  neutral,
  primary: {
    main: '#2563EB',
    light: '#3B82F6',
    dark: '#1D4ED8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#155DFC',
    light: '#d05ce3',
    dark: '#6a0080',
    contrastText: '#ffffff',
  },
  text: {
    primary: '#45556C',
    secondary: '#45556C',
    disabled: '#90A1B9',
  },
  action: {
    active: '#155DFC',
    disabled: '#90A1B9',
    disabledBackground: '#2F3746',
    focus: '#2563EB',
    hover: '#2563EB',
    selected: '#1D4ED8',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    secondary: '#434954',
  },
  divider: neutral[600],
  loader: '#ffffff',
  error: {
    main: '#EF4444',
  },
  info: {
    main: '#3B82F6',
  },
  success: {
    main: '#10B981',
  },
  warning: {
    main: '#F59E0B',
  },
};
