import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { DesignSystemThemeProvider } from './design-system/theme/ThemeProvider';
import { Loader } from './components';
import { store, persistor } from './redux/store';
import { ROOT_CONTAINER } from './constants';
import { router } from './router/routes';
import './i18n';
import { i18nPromise } from './i18n';
import './styles/index.css';

i18nPromise.then(() => {
  createRoot(document.querySelector(ROOT_CONTAINER)).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DesignSystemThemeProvider>
              <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
              <Toaster position="top-right" />
            </DesignSystemThemeProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </StrictMode>
  );
});
