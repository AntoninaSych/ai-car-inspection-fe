import { ThemeName } from './types';
import { THEME_STORAGE_KEY, safeLocalStorage } from './storage';

const DEFAULT_THEME = ThemeName.Dark;

export function detectSystemDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const isThemeName = (value: string): value is ThemeName => {
  return Object.values(ThemeName).includes(value as ThemeName);
};

export const getInitialThemeName = (): ThemeName => {
  const saved = safeLocalStorage.get(THEME_STORAGE_KEY) as ThemeName | null;
  if (isThemeName(saved)) {
    return saved;
  }

  return detectSystemDark() ? ThemeName.Dark : DEFAULT_THEME;
};
