import { ApiRoot } from '@commercetools/platform-sdk';
import { createContext, useMemo, useState } from 'react';

type ApiRootProviderProps = {
  children: React.ReactNode;
};

type ApiRootContextProps = {
  flowApiRoot: ApiRoot | undefined;
  setFlowApiRoot: React.Dispatch<React.SetStateAction<ApiRoot | undefined>>;
};

export const ApiRootContext = createContext({} as ApiRootContextProps);

export function ApiRootContextProvider({
  children,
}: ApiRootProviderProps): React.ReactElement {
  const [flowApiRoot, setFlowApiRoot] = useState<ApiRoot>();

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
