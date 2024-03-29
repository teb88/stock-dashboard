import '@fontsource/inter';
import './index.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {DEPLOYMENT_PATH} from './app.config.ts';
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
  {basename: import.meta.env.MODE === 'production' ? DEPLOYMENT_PATH : '/'}
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingIndicator />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
