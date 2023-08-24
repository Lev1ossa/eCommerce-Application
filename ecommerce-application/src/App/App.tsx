import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { Toast } from '../components/Toast/Toast';
import { router } from './routes/router';
import './styles/app.scss';
import './styles/vars.scss';

export function App(): React.ReactElement {
  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
}
