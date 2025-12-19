import { createTheme } from '@mui/material/styles';
import { basePalette } from '../../tokens/colors';
import { baseShape } from '../../tokens/shape';
import { baseTypography } from '../../tokens/typography';
import { baseComponents } from './components';
import { ThemeName } from '../constants';

export const createBaseTheme = () => {
  return createTheme({
    zIndex: {
      appBar: 1100,
      modal: 1400,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 768,
        lg: 1024,
        xl: 1440,
      },
    },
    typography: {
      ...baseTypography,
      htmlFontSize: 16,
    },
    palette: {
      mode: ThemeName.Light,
      ...basePalette,
    },
    components: baseComponents,
    shape: baseShape,
  });
};
