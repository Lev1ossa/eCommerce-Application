import {
  ILoginData,
  IRegistrationData,
  ToastTypes,
} from '../../../types/types';
import { createUser, getUser } from './requests';
import { showToast } from './showToast';
import { CustomTokenCache } from './tokenCache';

export const handleLogin = async (loginData: ILoginData): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  await getUser(loginData, tokenCache).then(
    () => {
      showToast(ToastTypes.success, `You are successfully logged in!`);
      const { refreshToken } = tokenCache.get();
      if (refreshToken) {
        localStorage.setItem('AAA-Ecom-refreshToken', refreshToken);
      }
    },
    (error: Error) => {
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const handleRegistration = async (
  registrationData: IRegistrationData,
): Promise<void> => {
  await createUser(registrationData).then(
    async () => {
      showToast(ToastTypes.success, `You are successfully registered!`);
      // auto login after registration
      await handleLogin({
        email: registrationData.email,
        password: registrationData.password,
      });
    },
    (error: Error) => {
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const handleLogout = (): void => {
  localStorage.removeItem('AAA-Ecom-refreshToken');
};
