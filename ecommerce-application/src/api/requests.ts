import {
  CartPagedQueryResponse,
  CategoryPagedQueryResponse,
  ClientResponse,
  Customer,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerSignin,
  MyCustomerUpdate,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { TokenCache } from '@commercetools/sdk-client-v2';
import { ILoginData, IRegistrationData } from '../types/types';
import {
  getAnonymousFlowApiRoot,
  getClientCridentialsFlowApiRoot,
  getPasswordFlowApiRoot,
  getRefreshTokenFlowApiRoot,
} from './clientBuilder';
import { getClientData, getRefreshToken } from './utils';

const projectKey: string = import.meta.env.VITE_PROJECT_KEY;

export const createUser = async (
  registrationData: IRegistrationData,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const apiRoot = getClientCridentialsFlowApiRoot();
  const clientData = getClientData(registrationData);
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({ body: clientData })
    .execute();
};

export const getUser = async (
  loginData: ILoginData,
  tokenCache: TokenCache,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const { email, password } = loginData;
  const apiRoot = getPasswordFlowApiRoot(email, password, tokenCache);
  const clientData: MyCustomerSignin = {
    email,
    password,
  };
  return apiRoot
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: clientData })
    .execute();
};

export const getAnonymousUser = async (
  tokenCache: TokenCache,
): Promise<ClientResponse<CartPagedQueryResponse>> => {
  const apiRoot = getAnonymousFlowApiRoot(tokenCache);
  return apiRoot.withProjectKey({ projectKey }).me().carts().get().execute();
};

export const getProductsList = async (): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .get({
      queryArgs: {
        limit: 30,
      },
    })
    .execute();
};

export const getFilteredProductList = async (
  filterQueryStrings: string[],
  sortQueryStrings: string[],
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        filter: filterQueryStrings,
        sort: sortQueryStrings,
      },
    })
    .execute();
};

export const getProductByID = async (
  productId: string,
): Promise<ClientResponse<ProductProjection>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .withId({ ID: productId })
    .get()
    .execute();
};

export const getProductByKey = async (
  productKey: string,
): Promise<ClientResponse<ProductProjection>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .withKey({ key: productKey })
    .get()
    .execute();
};

export const getProductBySlug = async (
  productSlug: string,
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'text.en': `"${productSlug}"`,
      },
    })
    .execute();
};

export const getCategories = async (): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute();
};

export const getCustomerData = async (): Promise<ClientResponse<Customer>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot.withProjectKey({ projectKey }).me().get().execute();
};

export const updateCustomerData = async (
  body: MyCustomerUpdate,
): Promise<ClientResponse<Customer>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot.withProjectKey({ projectKey }).me().post({ body }).execute();
};

export const updateCustomerPassword = async (
  body: MyCustomerChangePassword,
): Promise<ClientResponse<Customer>> => {
  const apiRoot = getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey({ projectKey })
    .me()
    .password()
    .post({ body })
    .execute();
};
