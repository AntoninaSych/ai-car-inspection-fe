import { ThemeName } from '../constants';
import { neutral } from '../../tokens/colors';

export const lightVariant = {
  palette: {
    mode: ThemeName.Light,
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      secondary: '#9DA4AE',
    },
    text: {
      primary: '#1F2126',
      secondary: neutral[600],
      disabled: neutral[300],
    },
    action: {
      active: '#6750A4',
      disabled: '#9DA4AE',
      disabledBackground: '#2F3746',
      focus: '#6750A4',
      hover: '#483873',
      selected: '#6750A4',
    },
  },
};
