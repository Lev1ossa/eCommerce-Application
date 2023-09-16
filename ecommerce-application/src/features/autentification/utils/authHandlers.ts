import {
  ILoginData,
  IRegistrationData,
  ToastTypes,
} from '../../../types/types';
import {
  createCart,
  createUser,
  getActiveCart,
  getUser,
} from '../../../api/requests';
import { showToast } from './showToast';
import { CustomTokenCache } from './tokenCache';
import { changeToken, createAnonymousToken } from '../../../api/tokenHandlers';

export const handleLogin = async (loginData: ILoginData): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  await getUser(loginData, tokenCache).then(
    () => {
      showToast(ToastTypes.success, `You are successfully logged in!`);
      const { refreshToken } = tokenCache.get();
      if (refreshToken) {
        changeToken({
          token: refreshToken,
          isLogin: true,
        });
      }
      getActiveCart()
        .then((result) => {
          console.log(result);
        })
        .catch(() => createCart())
        .catch((error: Error) => console.log(error));
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

export const handleLogout = async (): Promise<void> => {
  await createAnonymousToken();
};
