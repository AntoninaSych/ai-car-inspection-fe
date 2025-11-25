import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts';

const HomePage = lazy(() => import('../pages/HomePage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const ResultPage = lazy(() => import('../pages/ResultPage'));
const HistoryPage = lazy(() => import('../pages/HistoryPage'));
const ThankYouPage = lazy(() => import('../pages/ThankYouPage'));
const EstimatePage = lazy(() => import('../pages/EstimatePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'upload', element: <UploadPage /> },
      { path: 'result/:id', element: <ResultPage /> },
      { path: 'estimate/:id', element: <EstimatePage /> },
      { path: 'thank-you', element: <ThankYouPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
