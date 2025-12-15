import { useTranslation } from 'react-i18next';
import { startTransition } from 'react';
import { Stack, ButtonBase } from '@mui/material';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ua', label: 'UA' },
  ];

  const handleChangeLanguage = code => {
    startTransition(() => {
      i18n.changeLanguage(code);
    });
  };

  const itemSx = active => ({
    px: 1,
    py: 0.5,
    borderRadius: 0.5,
    fontSize: '12px',
    lineHeight: 1,
    color: active ? '#155DFC' : '#45556C',
    backgroundColor: active ? '#EFF6FF' : 'transparent',
    border: '1px solid transparent',
    transition: 'all 160ms ease',
    '&:hover': {
      backgroundColor: '#EFF6FF',
    },
  });

  const currentLang = languages.find(lng => lng.code === i18n.resolvedLanguage);

  return (
    <Stack spacing={0.5} direction="row">
      {languages.map(language => {
        const selected = language.code === currentLang.code;
        return (
          <ButtonBase key={language.code} onClick={() => handleChangeLanguage(language.code)} sx={itemSx(selected)}>
            {language.label}
          </ButtonBase>
        );
      })}
    </Stack>
  );
};
