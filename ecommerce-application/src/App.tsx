import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './components/Pages/MainPage/MainPage';
import { LoginPage } from './components/Pages/LoginPage/LoginPage';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';
import './App.css';
import { NotFoundPage } from './components/Pages/NotFoundPage/NotFoundPage';

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

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
