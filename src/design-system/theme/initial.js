import { ThemeName } from './constants';
import { THEME_STORAGE_KEY, safeLocalStorage } from './storage';

const DEFAULT_THEME = ThemeName.Dark;

export function detectSystemDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const isThemeName = value => {
  return Object.values(ThemeName).includes(value);
};

export const getInitialThemeName = () => {
  const saved = safeLocalStorage.get(THEME_STORAGE_KEY);
  if (isThemeName(saved)) {
    return saved;
  }

  return detectSystemDark() ? ThemeName.Dark : DEFAULT_THEME;
};
