import { ListItemIcon, ListItemText } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../../../design-system';
import { StyledMenuItem } from './styled';

export const ThemeMode = () => {
  const { t } = useTranslation();
  const { toggle, isDark } = useAppTheme();

  return (
    <StyledMenuItem onClick={toggle}>
      <ListItemIcon>{isDark ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}</ListItemIcon>
      <ListItemText
        primary={isDark ? t('mode.dark-label') : t('mode.light-label')}
        secondary={t('mode.switch-label')}
      />
    </StyledMenuItem>
  );
};
