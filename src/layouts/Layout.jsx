import { Suspense } from 'react';
import { Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header, Loader, Footer } from '../components';
import { StyledLayout } from './styled';

export const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <Toolbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster />
      <Footer />
    </StyledLayout>
  );
};
