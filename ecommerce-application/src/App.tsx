import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainPage } from './components/Pages/MainPage/MainPage';
import { LoginPage } from './components/Pages/LoginPage/LoginPage';
import { NotFoundPage } from './components/Pages/NotFoundPage/NotFoundPage';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';

import './App.css';
import { Toast } from './components/common/Toast/Toast';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <MainPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registration', element: <RegistrationPage /> },
    ],
  },
]);

function App(): React.ReactElement {
  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
}

export default App;
