import { createTheme } from '@mui/material/styles';
import { basePalette } from '../../tokens/colors';
import { baseShape } from '../../tokens/shape';
import { baseTypography, userTypography } from '../../tokens/typography';
import { baseComponents } from './components';
import { ExtendedTypographyOptions, ThemeName } from '../types';

export const createBaseTheme = () => {
  return createTheme({
    typography: {
      ...(userTypography as ExtendedTypographyOptions),
      ...(baseTypography as ExtendedTypographyOptions),
      htmlFontSize: 14,
    },
    palette: {
      mode: ThemeName.Dark,
      ...basePalette,
    } as any,
    components: baseComponents as any,
    shape: baseShape,
  });
};
