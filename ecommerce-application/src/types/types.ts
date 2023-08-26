import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  userFirstName: string;
  userLastName: string;
  birthDate: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  isShippingAddressDefault: boolean;
  isBillingAddressDefault: boolean;
  isSameAddress: boolean;
}

export interface IRegistrationPageParam {
  type: string;
  name: keyof IRegistrationData;
  options: RegisterOptions<IRegistrationData, keyof IRegistrationData>;
}

export interface IInputParams {
  label: string;
  type: string;
  input: UseFormRegisterReturn;
}

export interface IValidationRules {
  email: string[];
  password: string[];
  userFirstName: string[];
  userLastName: string[];
  birthDate: string[];
  shippingStreet: string[];
  shippingCity: string[];
  shippingPostalCode: string[];
  shippingCountry: string[];
  billingStreet: string[];
  billingCity: string[];
  billingPostalCode: string[];
  billingCountry: string[];
  isShippingAddressDefault: string[];
  isBillingAddressDefault: string[];
  isSameAddress: string[];
}

export enum ToastTypes {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
}

export interface IProduct {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  tm: string;
  img: string;
}
