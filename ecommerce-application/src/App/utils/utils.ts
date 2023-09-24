import { createAnonymousToken } from '../../api/tokenHandlers';

const isUserExists = (): boolean => {
  return !!localStorage.getItem('AAA-Ecom-authTokenData');
};

export const initializeApp = async (): Promise<void> => {
  if (!isUserExists()) {
    await createAnonymousToken();
  }
};

export const getTheme = (): string => {
  const currentTheme = localStorage.getItem('AAA-Ecom-theme');
  if (currentTheme) {
    return currentTheme;
  }

  return 'light';
};

export const setTheme = (): void => {
  const currentTheme = getTheme();
  document.documentElement.setAttribute('theme', currentTheme);
};

export const toggleTheme = (): void => {
  const currentTheme = getTheme();
  if (!currentTheme || currentTheme === 'light') {
    localStorage.setItem('AAA-Ecom-theme', 'dark');
  } else if (currentTheme === 'dark') {
    localStorage.setItem('AAA-Ecom-theme', 'light');
  }

  setTheme();
};
