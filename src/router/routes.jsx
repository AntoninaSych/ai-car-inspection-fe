import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Layout } from '../layouts';

const HomePage = lazy(() => import('../pages/HomePage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ResultPage = lazy(() => import('../pages/ResultPage'));
const ThankYouPage = lazy(() => import('../pages/ThankYouPage'));
const PayPage = lazy(() => import('../pages/PayPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      // 🔐 private routes
      {
        element: <PrivateRoute />,
        children: [
          { path: 'upload', element: <UploadPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'result/:id', element: <ResultPage /> },
          { path: 'pay/:id', element: <PayPage /> },
          { path: 'thank-you', element: <ThankYouPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
