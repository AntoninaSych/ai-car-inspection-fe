import { createTheme } from '@mui/material/styles';
import { basePalette } from '../../tokens/colors';
import { baseShape } from '../../tokens/shape';
import { baseTypography } from '../../tokens/typography';
import { baseComponents } from './components';
import { ThemeName } from '../constants';

export const createBaseTheme = () => {
  return createTheme({
    typography: {
      ...baseTypography,
      htmlFontSize: 16,
    },
    palette: {
      mode: ThemeName.Dark,
      ...basePalette,
    },
    components: baseComponents,
    shape: baseShape,
  });
};
