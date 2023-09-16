import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { Toast } from '../components/Toast/Toast';
import { ApiRootContextProvider } from '../context/ApiRootContext';
import { CartContextProvider } from '../context/CartContext';
import { router } from './routes/router';
import './styles/app.scss';
import './styles/vars.scss';
import { initializeApp } from './utils/utils';

export function App(): React.ReactElement {
  initializeApp();
  return (
    <>
      <ApiRootContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </ApiRootContextProvider>
      <Toast />
    </>
  );
}
