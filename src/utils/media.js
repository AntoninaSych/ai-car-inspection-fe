const CONSENT_URL = import.meta.env.VITE_CONSENT_URL;

export function getImageUrl(path) {
  if (!path) return '';

  // якщо бек вже віддає повний URL
  if (path.startsWith('http')) {
    return path;
  }

  const base = CONSENT_URL?.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');

  return `${base}/${cleanPath}`;
}
