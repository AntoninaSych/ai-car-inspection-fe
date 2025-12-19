import { useTheme as useMuiTheme } from '@mui/material/styles';
import { ThemeName } from '../constants';
import { useThemeSwitcher } from './useThemeSwitcher';

export const useAppTheme = () => {
  const theme = useMuiTheme();
  const { themeName, setThemeName } = useThemeSwitcher();
  const toggle = () => setThemeName(themeName === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark);
  const isDark = themeName === ThemeName.Dark;

  return { theme, themeName, setThemeName, isDark, toggle };
};
