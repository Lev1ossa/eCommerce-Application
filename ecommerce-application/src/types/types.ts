import {
  PathString,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form';

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
  isShipping: boolean;
  isBilling: boolean;
  newPassword: string;
  currentPassword: string;
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
  isShipping: string[];
  isBilling: PathString[];
  newPassword: string[];
  currentPassword: string[];
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

export interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: IAddressData[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

export interface IAddressData {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export type UserLogin = {
  token: string;
  isLogin: boolean;
};

export type UserAdress = {
  id: string | undefined;
  country: string | undefined;
  city: string | undefined;
  streetName: string | undefined;
  postalCode: string | undefined;
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
};

export type CustomCategory = {
  id: string;
  key?: string;
  name: string;
  slug: string;
  parentID?: string;
  children: CustomCategory[];
};

export interface ICurrentFilters {
  category?: string;
  trademark?: string;
  origin?: string;
}
