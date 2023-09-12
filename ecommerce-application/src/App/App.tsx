import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { Toast } from '../components/Toast/Toast';
import { CartContextProvider } from '../context/CartContext';
import { router } from './routes/router';
import './styles/app.scss';
import './styles/vars.scss';
import { initializeApp } from './utils/utils';

export function App(): React.ReactElement {
  initializeApp();
  return (
    <>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
      <Toast />
    </>
  );
}
