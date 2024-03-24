import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {DEPLOYMENT_PATH} from './app.config.ts';
import Details from './pages/details/Details.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const router = createBrowserRouter(
  [
    {path: '/', element: <App />},
    {path: '/details/:symbol', element: <Details />},
  ],
  {basename: import.meta.env.MODE === 'production' ? DEPLOYMENT_PATH : '/'}
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
