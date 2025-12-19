import { ThemeName } from './constants';
import { THEME_STORAGE_KEY, safeLocalStorage } from './storage';

const DEFAULT_THEME = ThemeName.Light;

const isThemeName = value => {
  return Object.values(ThemeName).includes(value);
};

export const getInitialThemeName = () => {
  const saved = safeLocalStorage.get(THEME_STORAGE_KEY);
  if (isThemeName(saved)) {
    return saved;
  }

  return DEFAULT_THEME;
};
