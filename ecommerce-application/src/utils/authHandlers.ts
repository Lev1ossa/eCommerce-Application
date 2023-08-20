import { ILoginData, IRegistrationData, ToastTypes } from '../types/types';
import { createUser, getUser } from './requests';
import { showToast } from './showToast';
import { CustomTokenCache } from './tokenCache';

export const handleLogin = async (loginData: ILoginData): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  getUser(loginData, tokenCache).then(
    () => {
      console.log(`TOKEN!!!!${tokenCache.get().refreshToken}`);
      showToast(ToastTypes.success, `You are successfully logged in!`);
      const { refreshToken } = tokenCache.get();
      console.log(3);
      if (refreshToken) {
        localStorage.setItem('AAA-Ecom-refreshToken', refreshToken);
      }
    },
    (error) => {
      console.log(error);
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const handleRegistration = (
  registrationData: IRegistrationData,
): void => {
  createUser(registrationData).then(
    () => {
      showToast(ToastTypes.success, `You are successfully registered!`);
      // auto login after registration
      handleLogin({
        email: registrationData.email,
        password: registrationData.password,
      });
    },
    (error) => {
      console.log(error);
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const handleLogout = (): void => {
  localStorage.removeItem('AAA-Ecom-refreshToken');
};
