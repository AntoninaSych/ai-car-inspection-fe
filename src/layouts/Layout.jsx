import { Suspense } from 'react';
import { Toolbar, Box } from '@mui/material';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header, Loader, Footer } from '../components';
import { GlobalModal } from '../features/globalModal';

export const Layout = () => {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Toolbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Suspense fallback={<Loader />}>
          <ScrollRestoration />
          <Outlet />
        </Suspense>
      </Box>
      <Toaster />
      <GlobalModal />
      <Footer />
    </Box>
  );
};
