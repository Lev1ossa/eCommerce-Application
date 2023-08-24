import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { handleLogout } from './utils/authHandlers';

export const Login = LoginForm;
export const Registration = RegistrationForm;
export const logout = handleLogout;
