/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Layout } from '../layouts';

const HomePage = lazy(() => import('../pages/HomePage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ReportsPage = lazy(() => import('../pages/ReportsPage'));
const SuccessPage = lazy(() => import('../pages/SuccessPage'));
const PaymentPage = lazy(() => import('../pages/PaymentPage'));
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
          { path: 'reports/:reportId', element: <ReportsPage /> },
          { path: 'tasks/pay/:taskId', element: <PaymentPage /> },
        ],
      },
      { path: 'success', element: <SuccessPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
