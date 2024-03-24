import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {DEPLOYMENT_PATH} from './constants.ts';

const router = createBrowserRouter(
  [
    {path: '/', element: <App />},
    {path: '/details/:symbol', element: <div>ASD</div>},
  ],
  {basename: import.meta.env.MODE === 'production' ? DEPLOYMENT_PATH : '/'}
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
