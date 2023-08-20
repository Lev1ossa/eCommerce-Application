import {
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { TokenCache } from '@commercetools/sdk-client-v2';
import {
  getClientCridentialsFlowApiRoot,
  getPasswordFlowApiRoot,
} from './clientBuilder';
import { ILoginData, IRegistrationData } from '../types/types';

const projectKey: string = import.meta.env.VITE_PROJECT_KEY;

export const createUser = async (
  data: IRegistrationData,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const apiRoot = getClientCridentialsFlowApiRoot();
  const clientData: CustomerDraft = {
    email: data.email,
    password: data.password,
    firstName: data.userFirstName,
    lastName: data.userLastName,
    dateOfBirth: data.birthDate,
  };
  // apiRoot
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({ body: clientData })
    .execute();
};

export const getUser = async (
  data: ILoginData,
  tokenCache: TokenCache,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const { email, password } = data;
  const apiRoot = getPasswordFlowApiRoot(email, password, tokenCache);
  const clientData: MyCustomerSignin = {
    email,
    password,
  };
  console.log({ projectKey });
  return apiRoot
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: clientData })
    .execute();
};
