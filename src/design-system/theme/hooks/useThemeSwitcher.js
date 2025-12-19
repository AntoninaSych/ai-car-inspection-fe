import { useContext } from 'react';
import { DesignSystemThemeContext } from '../ThemeProvider';

export const useThemeSwitcher = () => {
  const ctx = useContext(DesignSystemThemeContext);
  if (!ctx) {
    throw new Error('useThemeSwitcher must be used within DesignSystemThemeProvider');
  }
  return ctx;
};
