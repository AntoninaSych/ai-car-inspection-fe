import * as React from 'react';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  useTheme as useMuiTheme,
  ThemeProvider as MUIThemeProvider,
  type Theme as MuiTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeName } from './types';
import { safeLocalStorage, THEME_STORAGE_KEY } from './storage';
import { getInitialThemeName } from './initial';
import { getTheme } from './getTheme';

type ThemeContext = {
  themeName: ThemeName;
  setThemeName: (n: ThemeName) => void;
  toggle: () => void;
};

const DesignSystemThemeContext = createContext<ThemeContext | null>(null);

export const useThemeSwitcher = () => {
  const ctx = useContext(DesignSystemThemeContext);
  if (!ctx) {
    throw new Error('useThemeSwitcher must be used within DesignSystemThemeProvider');
  }
  return ctx;
};

export const useAppTheme = () => {
  const theme = useMuiTheme<MuiTheme>();
  const { themeName, setThemeName } = useThemeSwitcher();
  const toggle = () => setThemeName(themeName === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark);

  return { theme, themeName, setThemeName, toggle };
};

export const DesignSystemThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(getInitialThemeName);
  const theme = useMemo<MuiTheme>(() => getTheme(themeName), [themeName]);

  const toggle = () => {
    setThemeName(prev => (prev === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark));
  };

  // persist in localStorage when changed by user
  useEffect(() => {
    safeLocalStorage.set(THEME_STORAGE_KEY, themeName);
  }, [themeName]);

  // listen to system theme changes (prefers-color-scheme) if the user does not have their own light/dark set
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handle = (e: MediaQueryListEvent) => {
      const saved = safeLocalStorage.get(THEME_STORAGE_KEY);
      if (!saved) {
        setThemeName(e.matches ? ThemeName.Dark : ThemeName.Light);
      }
    };

    mql.addEventListener?.('change', handle);
    return () => mql.removeEventListener?.('change', handle);
  }, []);

  return (
    <DesignSystemThemeContext.Provider value={{ themeName, setThemeName, toggle }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </DesignSystemThemeContext.Provider>
  );
};
