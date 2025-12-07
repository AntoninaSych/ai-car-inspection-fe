export const THEME_STORAGE_KEY = 'app.theme';

export const safeLocalStorage = {
  get: key => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key, val) => {
    try {
      localStorage.setItem(key, val);
    } catch {
      return null;
    }
  },
};
