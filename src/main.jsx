import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { DesignSystemThemeProvider } from './design-system/theme/ThemeProvider';
import { Loader } from './components';
import { store, persistor } from './redux/store';
import { GlobalModal } from './features/globalModal';
import { setupAxiosInterceptors } from './api/axiosInstance';
import { App } from './App';
import './i18n';
import { i18nPromise } from './i18n';
import { ROOT_CONTAINER } from './constants';
import './styles/index.css';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

setupAxiosInterceptors(store);
const queryClient = new QueryClient();

i18nPromise.then(() => {
  createRoot(document.querySelector(ROOT_CONTAINER)).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DesignSystemThemeProvider>
              <Suspense fallback={<Loader />}>
                <App />
              </Suspense>
            </DesignSystemThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  );
});
