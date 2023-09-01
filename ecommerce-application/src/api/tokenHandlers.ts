import { showToast } from '../features/autentification/utils/showToast';
import { CustomTokenCache } from '../features/autentification/utils/tokenCache';
import { ToastTypes, UserLogin } from '../types/types';
import { getAnonymousUser } from './requests';

export const changeToken = (refreshToken: UserLogin): void => {
  localStorage.setItem('AAA-Ecom-refreshToken', JSON.stringify(refreshToken));
};

export const createAnonymousToken = async (): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  await getAnonymousUser(tokenCache).catch((error: Error) => {
    showToast(ToastTypes.error, error.message);
  });
  const { refreshToken } = tokenCache.get();
  if (refreshToken) {
    changeToken({
      token: refreshToken,
      isLogin: false,
    });
  }
};

export const isUserLoggedIn = (): boolean => {
  const userLoginJson = localStorage.getItem('AAA-Ecom-refreshToken');
  if (userLoginJson) {
    const userLogin: UserLogin = JSON.parse(userLoginJson);
    return userLogin.isLogin;
  }

  return false;
};
