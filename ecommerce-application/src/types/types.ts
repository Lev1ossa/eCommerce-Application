import { RegisterOptions } from 'react-hook-form';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  name: string;
  userSecondName: string;
  birthDate: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  text: string;
}

export interface IRegistrationPageParam {
  type: string;
  name: keyof IRegistrationData;
  options: RegisterOptions<IRegistrationData, keyof IRegistrationData>;
}
