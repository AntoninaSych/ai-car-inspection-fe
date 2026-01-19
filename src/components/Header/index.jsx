import { useState } from 'react';
import { Toolbar, Box, Stack, IconButton, Drawer, Button, Divider, SvgIcon, Avatar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthBar, UserBar, LanguageSwitcher } from './components';
import { selectIsAuthorized, selectUser } from '../../redux/auth/selectors';
import { openModal } from '../../features/globalModal/slice';
import { PageContainer } from '../../layouts';
import { GetStarted } from '../GetStarted';
import { Brand } from '../Brand';
import ElevationScroll from './hocs/ElevationScroll';
import { StyledAppBar } from './styled';
import { ROUTERS } from '../../constants';

const CustomPlusIcon = props => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      fill="currentColor"
    />
  </SvgIcon>
);

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const user = useSelector(selectUser);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const handleOnLogout = () => {
    dispatch(openModal({ type: 'logout' }));
  };

  const MenuButton = ({ to, icon, label, onClick, color = 'text.primary' }) => {
    const isActive = to ? location.pathname === to : false;

    return (
      <Button
        component={to ? Link : 'button'}
        to={to}
        onClick={onClick}
        startIcon={icon}
        fullWidth
        size="large"
        variant={isActive ? 'contained' : 'text'}
        sx={{
          justifyContent: 'flex-start',
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: isActive ? 700 : 600,
          borderRadius: 2,
          ...(isActive && {
            background: 'linear-gradient(90deg, #3C50E0 0%, #7635dc 100%)',
            color: 'common.white',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              background: 'linear-gradient(90deg, #2c3e9e 0%, #5e2a9e 100%)',
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
            },
            '& .MuiSvgIcon-root': { color: 'common.white' },
          }),
          ...(!isActive && {
            color: color,
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
              color: 'primary.main',
            },
          }),
        }}
      >
        {label}
      </Button>
    );
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          height: 64,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Brand />
        <IconButton onClick={handleDrawerToggle} edge="end" color="inherit" size="large">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, display: 'flex', justifyContent: isAuthorized ? 'flex-start' : 'center' }}>
        <LanguageSwitcher />
      </Box>

      {isAuthorized && user && (
        <>
          <Divider />
          <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={user.avatarURL}
              alt={user.name}
              sx={{
                background: 'linear-gradient(90deg, #3C50E0 0%, #7635dc 100%)',
                color: 'common.white',
                fontWeight: 700,
              }}
            >
              {user.name ? user.name[0].toUpperCase() : null}
            </Avatar>

            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle1" fontWeight={700} noWrap>
                {user.name}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </>
      )}

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {isAuthorized ? (
          <>
            <MenuButton
              to={ROUTERS.DASHBOARD}
              icon={<DashboardIcon />}
              label={t('nav.dashboard', 'Dashboard')}
              onClick={handleDrawerToggle}
            />

            <MenuButton
              to={ROUTERS.FAQ}
              icon={<HelpOutlineIcon />}
              label={t('footer.sections.product.links.faq', 'FAQ')}
              onClick={handleDrawerToggle}
            />

            <MenuButton
              to={ROUTERS.UPLOAD}
              icon={<CustomPlusIcon />}
              label={t('buttons.newEstimate', 'New Estimate')}
              onClick={handleDrawerToggle}
            />

            <MenuButton
              onClick={() => {
                handleOnLogout();
                handleDrawerToggle();
              }}
              icon={<LogoutIcon />}
              label={t('buttons.logout', 'Logout')}
              color="error.main"
            />
          </>
        ) : (
          <>
            <MenuButton
              to={ROUTERS.FAQ}
              icon={<HelpOutlineIcon />}
              label={t('footer.sections.product.links.faq', 'FAQ')}
              onClick={handleDrawerToggle}
            />

            <Box onClick={handleDrawerToggle} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <AuthBar />
            </Box>

            <Box onClick={handleDrawerToggle} sx={{ mt: 1 }}>
              <GetStarted fullWidth size="large" />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Divider />
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box mb={2}>
            <Brand />
          </Box>

          <Stack direction="row" justifyContent="center" gap={2} mb={1}>
            <Typography
              component={Link}
              to={ROUTERS.PP}
              variant="caption"
              color="text.secondary"
              onClick={handleDrawerToggle}
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {t('footer.privacyPolicy', 'Privacy Policy')}
            </Typography>
            <Typography
              component={Link}
              to={ROUTERS.TERMS}
              variant="caption"
              color="text.secondary"
              onClick={handleDrawerToggle}
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {t('footer.termsOfUse', 'Terms of Use')}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} AutoExpert. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ElevationScroll>
      <StyledAppBar position="fixed">
        <PageContainer>
          <Toolbar disableGutters>
            <Brand />
            <Box sx={{ flexGrow: 1 }} />
            <Stack
              direction="row"
              gap={{ xs: 1.5, md: 3 }}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <LanguageSwitcher />
              {isAuthorized ? <UserBar onLogout={handleOnLogout} /> : <AuthBar />}
              <GetStarted />
            </Stack>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon color="primary" fontSize="large" />
            </IconButton>
          </Toolbar>
        </PageContainer>
        <nav>
          <Drawer
            anchor="right"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: 320,
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </nav>
      </StyledAppBar>
    </ElevationScroll>
  );
};
