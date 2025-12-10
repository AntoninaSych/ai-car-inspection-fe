/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Layout } from '../layouts';

const HomePage = lazy(() => import('../pages/HomePage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ReportDetailsPage = lazy(() => import('../pages/ReportDetailsPage'));
const SuccessPage = lazy(() => import('../pages/SuccessPage'));
const PaymentPage = lazy(() => import('../pages/PaymentPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const StripeTestPage = lazy(() => import('../pages/StripeTestPage'));
const StripeSuccessPage = lazy(() => import('../pages/StripeSuccessPage'));
const StripeCancelPage = lazy(() => import('../pages/StripeCancelPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: 'stripe-test', element: <StripeTestPage /> },
      { path: 'stripe/success', element: <StripeSuccessPage /> },
      { path: 'stripe/cancel', element: <StripeCancelPage /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: 'upload', element: <UploadPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'reports/:reportId', element: <ReportDetailsPage /> },
          { path: 'tasks/pay/:taskId', element: <PaymentPage /> },
        ],
      },
      { path: 'success', element: <SuccessPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
