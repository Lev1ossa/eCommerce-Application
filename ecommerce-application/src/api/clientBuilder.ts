import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  AnonymousAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';
import fetch from 'node-fetch';

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

// Anonymous session flow api root
export const getAnonymousFlowApiRoot = (tokenCache: TokenCache): ApiRoot => {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: `https://auth.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
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
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};

// Refresh token flow api root
export const getRefreshTokenFlowApiRoot = (refreshToken: string): ApiRoot => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: `https://auth.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    refreshToken,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${import.meta.env.VITE_API_REGION}.commercetools.com`,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};
