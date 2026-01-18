import { ALLOWED_LANGUAGES, DEFAULT_LANGUAGE } from '../constants';

const normalizeLang = lang => {
  if (!lang) {
    return lang;
  }
  return lang === 'uk' ? 'ua' : lang;
};

export const getNormalizedLang = lang => {
  const normalizedLang = normalizeLang(lang);
  return ALLOWED_LANGUAGES.includes(normalizedLang) ? normalizedLang : DEFAULT_LANGUAGE;
};
