import { ThemeName } from '../theme/types';

const neutral = {
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
  mode: ThemeName.Dark,
  action: {
    active: '#6750A4',
    disabled: '#9DA4AE',
    disabledBackground: '#2F3746',
    focus: '#6750A4',
    hover: '#483873',
    selected: '#6750A4',
  },
  background: {
    default: '#1F2126',
    paper: '#FFFFFF',
    secondary: '#434954',
  },
  text: {
    primary: '#F8F9FA',
    secondary: '#F8F9FA',
    disabled: '#9DA4AE',
  },
  neutral,
  divider: '#4D5761',
  loader: '#ffffff',
  primary: {
    light: '#9382c2',
    main: '#6750A4',
    dark: '#483873',
  },
  error: {
    main: '#F04438',
  },
  info: {
    main: '#06AED4',
  },
  success: {
    main: '#10B981',
  },
  warning: {
    main: '#F79009',
  },
};
