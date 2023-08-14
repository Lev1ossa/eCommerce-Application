export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  userFirstName: string;
  userSecondName: string;
  birthDate: string;
  street: string;
  city: string;
  postalCode: string;
}
