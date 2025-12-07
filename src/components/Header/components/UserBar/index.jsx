import { useState } from 'react';
import { Avatar, IconButton, Menu, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { AccountCircle, Logout, LightMode, DarkMode } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Nav } from '../Nav';
import { ROUTERS } from '../../../../constants';
import { useAppTheme } from '../../../../design-system';
import { StyledMenuItem } from './styled';

export const UserBar = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggle, isDark } = useAppTheme();
  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Nav />
      <IconButton onClick={handleOpen} size="small" sx={{ ml: 1 }}>
        {user?.avatarURL ? (
          <Avatar src={user.avatarURL} alt={user.name} sx={{ width: 32, height: 32 }} />
        ) : (
          <AccountCircle sx={{ width: 32, height: 32 }} />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        <StyledMenuItem component={Link} to={ROUTERS.PROFILE}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </StyledMenuItem>

        <Divider />

        <StyledMenuItem onClick={toggle}>
          <ListItemIcon>{isDark ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}</ListItemIcon>
          <ListItemText
            primary={isDark ? t('mode.dark-label') : t('mode.light-label')}
            secondary={t('mode.switch-label')}
          />
        </StyledMenuItem>

        <Divider />

        <StyledMenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </StyledMenuItem>
      </Menu>
    </>
  );
};
