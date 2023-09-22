import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTheme } from '../App/utils/utils';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type ThemeContextProps = {
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const themeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider({
  children,
}: ThemeProviderProps): React.ReactElement {
  const [theme, setTheme] = useState<string>();

  const setDefaultTheme = useCallback(() => {
    const defaultTheme = getTheme();
    setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    setDefaultTheme();
  }, [setDefaultTheme]);

  const themeContextValue: ThemeContextProps = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme],
  );

  return (
    <themeContext.Provider value={themeContextValue}>
      {children}
    </themeContext.Provider>
  );
}
