import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  userFirstName: string;
  userLastName: string;
  birthDate: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IRegistrationPageParam {
  type: string;
  name: keyof IRegistrationData;
  options: RegisterOptions<IRegistrationData, keyof IRegistrationData>;
}

export interface IInputParams {
  type: string;
  input: UseFormRegisterReturn;
}
export interface IValidationRules {
  email: string[];
  password: string[];
  userFirstName: string[];
  userLastName: string[];
  birthDate: string[];
  street: string[];
  city: string[];
  postalCode: string[];
  country: string[];
}
