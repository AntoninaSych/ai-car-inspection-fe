import { useState } from 'react';
import { Toolbar, Box, Stack, IconButton, Drawer, Button, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthBar, UserBar, LanguageSwitcher } from './components';
import { selectIsAuthorized } from '../../redux/auth/selectors';
import { openModal } from '../../features/globalModal/slice';
import { PageContainer } from '../../layouts';
import { GetStarted } from '../GetStarted';
import { Brand } from '../Brand';
import ElevationScroll from './hocs/ElevationScroll';
import { StyledAppBar } from './styled';
import { ROUTERS } from '../../constants';

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const handleOnLogout = () => {
    dispatch(openModal({ type: 'logout' }));
  };

  // --- УНІВЕРСАЛЬНА КНОПКА МЕНЮ ---
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
        // Використовуємо 'contained' для активної, щоб спрацювали стилі тексту,
        // але фон перезапишемо градієнтом
        variant={isActive ? 'contained' : 'text'}
        sx={{
          justifyContent: 'flex-start',
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: isActive ? 700 : 600,
          borderRadius: 2,

          // --- СТИЛІ ДЛЯ АКТИВНОЇ КНОПКИ (ГРАДІЄНТ) ---
          ...(isActive && {
            // Градієнт від синього до фіолетового
            background: 'linear-gradient(90deg, #3C50E0 0%, #7635dc 100%)',
            color: 'common.white',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Тінь для краси
            '&:hover': {
              background: 'linear-gradient(90deg, #2c3e9e 0%, #5e2a9e 100%)', // Темніший градієнт при наведенні
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
            },
            '& .MuiSvgIcon-root': {
              color: 'common.white',
            },
          }),

          // --- СТИЛІ ДЛЯ НЕАКТИВНОЇ КНОПКИ ---
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

  // --- ВМІСТ МОБІЛЬНОГО МЕНЮ ---
  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Хедер шторки */}
      <Box
        sx={{
          height: 64,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Brand />
        <IconButton onClick={handleDrawerToggle} edge="end" color="inherit" size="large">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Список пунктів */}
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

            <Divider sx={{ my: 1 }} />

            {/* New Estimate (Чорна якщо неактивна, Градієнт якщо активна) */}
            <MenuButton
              to={ROUTERS.UPLOAD}
              icon={<AddIcon />}
              label={t('buttons.newEstimate', 'New Estimate')}
              onClick={handleDrawerToggle}
            />

            <Divider sx={{ my: 1 }} />

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
          /* Для гостя */
          <>
            <MenuButton
              to={ROUTERS.FAQ}
              icon={<HelpOutlineIcon />}
              label={t('footer.sections.product.links.faq', 'FAQ')}
              onClick={handleDrawerToggle}
            />

            <Divider sx={{ my: 1 }} />

            <Box onClick={handleDrawerToggle} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <AuthBar />
            </Box>

            <Box onClick={handleDrawerToggle} sx={{ mt: 1 }}>
              <GetStarted fullWidth size="large" />
            </Box>
          </>
        )}

        {/* Перемикач мови */}
        <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'center' }}>
          <LanguageSwitcher />
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

            {/* DESKTOP */}
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

            {/* MOBILE BURGER */}
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
