import { ApiRoot } from '@commercetools/platform-sdk';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getRefreshTokenFlowApiRoot } from '../api/clientBuilder';
import { getRefreshToken } from '../api/utils';
import { ApiRootContextProps, ApiRootProviderProps } from '../types/types';

export const ApiRootContext = createContext({} as ApiRootContextProps);

export function ApiRootContextProvider({
  children,
}: ApiRootProviderProps): React.ReactElement {
  const [flowApiRoot, setFlowApiRoot] = useState<ApiRoot>();

  const setDefaultApiRoot = useCallback(() => {
    const refreshTokenFlowApiRoot = getRefreshTokenFlowApiRoot(
      getRefreshToken(),
    );
    setFlowApiRoot(refreshTokenFlowApiRoot);
  }, []);

  useEffect(() => {
    setDefaultApiRoot();
  }, [setDefaultApiRoot]);

  const ApiRootContextValue: ApiRootContextProps = useMemo(
    () => ({ flowApiRoot, setFlowApiRoot }),
    [flowApiRoot, setFlowApiRoot],
  );

  return (
    <ApiRootContext.Provider value={ApiRootContextValue}>
      {children}
    </ApiRootContext.Provider>
  );
}
