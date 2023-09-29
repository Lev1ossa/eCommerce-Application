import { showToast } from '../features/autentification/utils/showToast';
import { CustomTokenCache } from '../features/autentification/utils/tokenCache';
import { ApiRootContextProps, ToastTypes, UserLogin } from '../types/types';
import { getRefreshTokenFlowApiRoot } from './clientBuilder';
import { getAnonymousUser } from './requests';
import { getRefreshToken } from './utils';

export const changeToken = (refreshToken: UserLogin): void => {
  localStorage.setItem(
    'AAA-Ecom-refreshTokenData',
    JSON.stringify(refreshToken),
  );
};

export const createAnonymousToken = async (
  refreshTokenFlowApiRoot?: ApiRootContextProps,
): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  await getAnonymousUser(tokenCache).then(
    () => {
      const { refreshToken } = tokenCache.get();
      if (refreshToken) {
        changeToken({
          token: refreshToken,
          isLogin: false,
        });
      }
      if (refreshTokenFlowApiRoot) {
        refreshTokenFlowApiRoot.setFlowApiRoot(
          getRefreshTokenFlowApiRoot(getRefreshToken()),
        );
      }
    },
    (error: Error) => {
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const isUserLoggedIn = (): boolean => {
  const userLoginJson = localStorage.getItem('AAA-Ecom-refreshTokenData');
  if (userLoginJson) {
    const userLogin: UserLogin = JSON.parse(userLoginJson);
    return userLogin.isLogin;
  }

  return false;
};
