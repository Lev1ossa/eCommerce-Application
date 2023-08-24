import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import { IRegistrationData } from '../../../types/types';
import { MINIMAL_ACCESS_AGE } from '../constants/constants';

export const getFullYears = (date: string): number => {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const years = currentDate.getFullYear() - birthDate.getFullYear();
  if (!years) return 0;
  if (currentDate.getMonth() > birthDate.getMonth()) return years;
  if (currentDate.getMonth() < birthDate.getMonth()) return years - 1;
  return currentDate.getDate() >= birthDate.getDate() ? years : years - 1;
};

export const checkDateValidity = (date: string): boolean | string => {
  if (new Date(date).getTime() > new Date().getTime()) {
    return "You can't be born in the future";
  }
  return (
    getFullYears(date) >= MINIMAL_ACCESS_AGE ||
    `Sorry, you are under ${MINIMAL_ACCESS_AGE}`
  );
};

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
  return {
    email: registrationData.email,
    password: registrationData.password,
    firstName: registrationData.userFirstName,
    lastName: registrationData.userLastName,
    dateOfBirth: registrationData.birthDate,
    addresses: clientAddresses,
    shippingAddresses: [clientShippingAdressID],
    billingAddresses: [clientBillingAdressID],
    defaultShippingAddress: clientDefaultShippingAddress,
    defaultBillingAddress: clientDefaultBillingAddress,
  };
};
