import { createContext, useEffect, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeName } from './constants';
import { safeLocalStorage, THEME_STORAGE_KEY } from './storage';
import { getInitialThemeName } from './initial';
import { getTheme } from './getTheme';

export const DesignSystemThemeContext = createContext(null);

export const DesignSystemThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(getInitialThemeName);
  const theme = useMemo(() => getTheme(themeName), [themeName]);

  const toggle = () => {
    setThemeName(prev => (prev === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark));
  };

  // persist in localStorage when changed by user
  useEffect(() => {
    safeLocalStorage.set(THEME_STORAGE_KEY, themeName);
  }, [themeName]);

  return (
    <DesignSystemThemeContext.Provider value={{ themeName, setThemeName, toggle }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </DesignSystemThemeContext.Provider>
  );
};
