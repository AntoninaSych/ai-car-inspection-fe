/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Layout } from '../layouts';

const HomePage = lazy(() => import('../pages/HomePage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const ProfilePage = lazy(() => import('../features/profile/ProfilePage'));
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));
const ReportDetailsPage = lazy(() => import('../features/report-details/ReportDetailsPage'));
const SuccessPage = lazy(() => import('../pages/SuccessPage'));
const StripeStatusPage = lazy(() => import('../pages/stripe/StripeStatusPage'));
const StripeCancelPage = lazy(() => import('../pages/stripe/StripeCancelPage'));
const PaymentPage = lazy(() => import('../pages/PaymentPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const CookiePolicyPage = lazy(() => import('../pages/CookiePolicyPage'));
const ResetPasswordPage = lazy(() => import('../features/forgot-password/pages/ResetPasswordPage/ResetPasswordPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));

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
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'reports/:reportId', element: <ReportDetailsPage /> },
          { path: 'tasks/pay/:taskId', element: <PaymentPage /> },
          { path: 'stripe/success', element: <StripeStatusPage /> },
          { path: 'stripe/cancel', element: <StripeCancelPage /> },
        ],
      },
      { path: 'success', element: <SuccessPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'agb', element: <TermsPage /> },
      { path: 'cookies', element: <CookiePolicyPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
