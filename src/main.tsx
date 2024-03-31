import '@fontsource/inter';
import './index.css';

import {CssVarsProvider} from '@mui/joy/styles';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import App from './App.tsx';
import LoadingIndicator from './components/LoadingIndicator.tsx';

const Details = React.lazy(() => import('./pages/details/Details.tsx'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard.tsx'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {path: '/', element: <Dashboard />},
        {path: 'details/:symbol', element: <Details />},
        {
          path: '*',
          element: <Navigate to={'/'} replace />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BUILD_BASE || '/',
  }
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider
        defaultMode="system"
        modeStorageKey="joy-mode-scheme-dark"
      >
        <Suspense fallback={<LoadingIndicator />}>
          <RouterProvider router={router} />
        </Suspense>
      </CssVarsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
