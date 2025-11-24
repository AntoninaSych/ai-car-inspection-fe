import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';
import { createBaseTheme } from './base';
import { lightVariant, darkVariant } from './variants';
import { ThemeName } from './types';

const pickVariant = (name: ThemeName) => {
  switch (name) {
    case ThemeName.Light:
      return lightVariant;
    case ThemeName.Dark:
      return darkVariant;
    default:
      return darkVariant;
  }
};

export const getTheme = (name: ThemeName) => {
  const base = createBaseTheme();
  const variant = pickVariant(name);
  // IMPORTANT: deepmerge via plain object, then createTheme,
  // to preserve types and references to palette/typography
  const merged = deepmerge(base, variant);
  return createTheme(merged);
};
