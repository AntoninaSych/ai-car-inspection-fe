import { useState } from 'react';
import { Avatar, IconButton, Menu, ListItemIcon, Divider } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTERS } from '../../../../constants';
import { selectUser } from '../../../../redux/auth/selectors';
import { StyledMenuItem } from './styled';

export const UserBar = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector(selectUser);
  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
