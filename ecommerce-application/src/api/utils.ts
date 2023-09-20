import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { IRegistrationData, UserLogin } from '../types/types';

// eslint-disable-next-line max-lines-per-function
export const getClientData = (
  registrationData: IRegistrationData,
): CustomerDraft => {
  const clientShippingAdress: BaseAddress = {
    country: registrationData.shippingCountry,
    city: registrationData.shippingCity,
    streetName: registrationData.shippingStreet,
    postalCode: registrationData.shippingPostalCode,
  };
  const clientBillingAdress: BaseAddress = {
    country: registrationData.billingCountry,
    city: registrationData.billingCity,
    streetName: registrationData.billingStreet,
    postalCode: registrationData.billingPostalCode,
  };
  const clientAddresses = registrationData.isSameAddress
    ? [clientShippingAdress]
    : [clientShippingAdress, clientBillingAdress];
  const clientShippingAdressID = clientAddresses.indexOf(clientShippingAdress);
  const clientBillingAdressID = registrationData.isSameAddress
    ? clientShippingAdressID
    : clientAddresses.indexOf(clientBillingAdress);
  const clientDefaultShippingAddress = registrationData.isShippingAddressDefault
    ? clientShippingAdressID
    : undefined;
  const clientDefaultBillingAddress = registrationData.isBillingAddressDefault
    ? clientBillingAdressID
    : undefined;

  const clientDateOfBirth = new Date(registrationData.birthDate)
    .toISOString()
    .slice(0, 10);
  return {
    email: registrationData.email,
    password: registrationData.password,
    firstName: registrationData.userFirstName,
    lastName: registrationData.userLastName,
    dateOfBirth: clientDateOfBirth,
    addresses: clientAddresses,
    shippingAddresses: [clientShippingAdressID],
    billingAddresses: [clientBillingAdressID],
    defaultShippingAddress: clientDefaultShippingAddress,
    defaultBillingAddress: clientDefaultBillingAddress,
  };
};

export const getRefreshToken = (): string => {
  const userLoginJson = localStorage.getItem('AAA-Ecom-authData');
  if (userLoginJson) {
    const userLogin: UserLogin = JSON.parse(userLoginJson);
    return userLogin.token;
  }
  return '';
};

export const generateUniqueKey = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
