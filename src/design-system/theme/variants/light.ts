import { Theme } from '@mui/material/styles';
import { DeepPartial, ThemeName } from '../types';

export const lightVariant: DeepPartial<Theme> = {
  palette: {
    mode: ThemeName.Light,
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      secondary: '#9DA4AE',
    },
    text: {
      primary: '#1F2126',
      secondary: '#F8F9FA',
      disabled: '#9DA4AE',
    },
  },
};
