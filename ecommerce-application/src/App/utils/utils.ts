import { createAnonymousToken } from '../../api/tokenHandlers';

const isUserExists = (): boolean => {
  return !!localStorage.getItem('AAA-Ecom-authData');
};

export const initializeApp = async (): Promise<void> => {
  if (!isUserExists()) {
    await createAnonymousToken();
  }
};
