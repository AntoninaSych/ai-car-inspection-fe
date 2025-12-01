import { useTranslation } from 'react-i18next';
import { useState, startTransition, Fragment } from 'react';
import { Box, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { TranslateOutlined } from '@mui/icons-material';

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
    <Box sx={{ ml: 1 }}>
      <IconButton onClick={handleOpen} size="small">
        <TranslateOutlined sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: 180,
              mt: 1.5,
              borderRadius: 2,
            },
          },
        }}
      >
        {languages.map((lng, index) => {
          const last = index === languages.length - 1;
          const selected = lng.code === currentLang.code;
          return (
            <Fragment key={lng.code}>
              <MenuItem selected={selected} onClick={() => handleChangeLanguage(lng.code)}>
                {lng.label}
              </MenuItem>
              {!last && <Divider />}
            </Fragment>
          );
        })}
      </Menu>
    </Box>
  );
};
