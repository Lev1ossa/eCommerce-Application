import { createAnonymousToken } from '../../api/tokenHandlers';

const isUserExists = (): boolean => {
  return !!localStorage.getItem('AAA-Ecom-refreshToken');
};

export const initializeApp = (): void => {
  if (!isUserExists()) {
    createAnonymousToken();
  }
};
