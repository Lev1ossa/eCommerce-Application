import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../../Pages/LoginPage/LoginPage';
import { MainPage } from '../../Pages/MainPage/MainPage';
import { NotFoundPage } from '../../Pages/NotFoundPage/NotFoundPage';
import { RegistrationPage } from '../../Pages/RegistrationPage/RegistrationPage';
import { CatalogPage } from '../../Pages/CatalogPage/CatalogPage';
import { ProductPage } from '../../Pages/ProductPage/ProductPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <MainPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registration', element: <RegistrationPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'product', element: <ProductPage /> },
    ],
  },
]);
