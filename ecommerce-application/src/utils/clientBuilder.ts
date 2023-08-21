import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

export const projectKey: string = import.meta.env.VITE_PROJECT_KEY;

// Client cridentials flow api root
export const getClientCridentialsFlowApiRoot = (): ApiRoot => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: `https://auth.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    scopes: [import.meta.env.VITE_SCOPE],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};

// Password flow api root
export const getPasswordFlowApiRoot = (
  email: string,
  password: string,
  tokenCache: TokenCache,
): ApiRoot => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: `https://auth.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes: [import.meta.env.VITE_SCOPE],
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};

// export const createTokenCache = (email, password): void => {
//   // const { email, password } = data;
//   const tokenCache: TokenCache = {

//   };
// }
