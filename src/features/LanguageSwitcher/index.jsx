import { useTranslation } from 'react-i18next';
import { useState, startTransition } from 'react';
import { ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Translate as TranslateIcon, Check as CheckIcon } from '@mui/icons-material';
import { LanguageButton, LanguageMenu, LanguageMenuItem } from './styled';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ua', label: 'Українська' },
  ];

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = code => {
    startTransition(() => {
      i18n.changeLanguage(code);
    });
    setAnchorEl(null);
  };

  const currentLang = languages.find(lng => lng.code === i18n.resolvedLanguage) ?? languages[0];

  return (
    <Box sx={{ ml: 2 }}>
      <LanguageButton
        onClick={handleOpen}
        size="small"
        aria-haspopup="true"
        aria-controls={open ? 'language-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
      >
        <TranslateIcon fontSize="small" />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {currentLang.code.toUpperCase()}
        </Typography>
      </LanguageButton>
      <LanguageMenu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {languages.map(lng => {
          const isSelected = lng.code === currentLang.code;
          return (
            <LanguageMenuItem key={lng.code} selected={isSelected} onClick={() => handleChangeLanguage(lng.code)}>
              <ListItemIcon>
                {isSelected ? <CheckIcon fontSize="small" /> : <span style={{ width: 16 }} />}
              </ListItemIcon>
              <ListItemText primary={lng.label} />
            </LanguageMenuItem>
          );
        })}
      </LanguageMenu>
    </Box>
  );
};
