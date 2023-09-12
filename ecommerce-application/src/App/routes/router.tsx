import { createBrowserRouter } from 'react-router-dom';
import { CatalogPage } from '../../Pages/CatalogPage/CatalogPage';
import { LoginPage } from '../../Pages/LoginPage/LoginPage';
import { MainPage } from '../../Pages/MainPage/MainPage';
import { NotFoundPage } from '../../Pages/NotFoundPage/NotFoundPage';
import { ProductPage } from '../../Pages/ProductPage/ProductPage';
import { RegistrationPage } from '../../Pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from '../../Pages/ProfilePage/ProfilePage';
import { BasketPage } from '../../Pages/BasketPage/BasketPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <MainPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'cart', element: <BasketPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registration', element: <RegistrationPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:categorySlug', element: <CatalogPage /> },
      {
        path: 'catalog/:categorySlug/:subCategorySlug',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:categorySlug/:subCategorySlug/:slug',
        element: <ProductPage />,
      },
    ],
  },
]);
