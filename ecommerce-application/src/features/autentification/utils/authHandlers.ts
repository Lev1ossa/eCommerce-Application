import {
  ApiRootContextProps,
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
import { getRefreshTokenFlowApiRoot } from '../../../api/clientBuilder';
import { getRefreshToken } from '../../../api/utils';

export const handleLogin = async (
  loginData: ILoginData,
  refreshTokenFlowApiRoot: ApiRootContextProps,
): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  await getUser(loginData, tokenCache, refreshTokenFlowApiRoot).then(
    () => {
      showToast(ToastTypes.success, `You are successfully logged in!`);
      const { refreshToken } = tokenCache.get();
      if (refreshToken) {
        changeToken({
          token: refreshToken,
          isLogin: true,
        });
      }
      refreshTokenFlowApiRoot.setFlowApiRoot(
        getRefreshTokenFlowApiRoot(getRefreshToken()),
      );
      getActiveCart(refreshTokenFlowApiRoot)
        .then((result) => {
          console.log(result);
        })
        .catch(() => createCart(refreshTokenFlowApiRoot))
        .catch((error: Error) => console.log(error));
    },
    (error: Error) => {
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const handleRegistration = async (
  registrationData: IRegistrationData,
  refreshTokenFlowApiRoot: ApiRootContextProps,
): Promise<void> => {
  await createUser(registrationData, refreshTokenFlowApiRoot).then(
    async () => {
      showToast(ToastTypes.success, `You are successfully registered!`);
      // auto login after registration
      await handleLogin(
        {
          email: registrationData.email,
          password: registrationData.password,
        },
        refreshTokenFlowApiRoot,
      );
    },
    (error: Error) => {
      showToast(ToastTypes.error, error.message);
    },
  );
};

export const handleLogout = async (
  refreshTokenFlowApiRoot: ApiRootContextProps,
): Promise<void> => {
  await createAnonymousToken(refreshTokenFlowApiRoot);
};
