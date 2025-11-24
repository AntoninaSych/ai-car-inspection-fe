export const THEME_STORAGE_KEY = 'app.theme';

export const safeLocalStorage = {
    get: (key: string) => {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    set: (key: string, val: string) => {
        try {
            localStorage.setItem(key, val);
        } catch {}
    },
};
