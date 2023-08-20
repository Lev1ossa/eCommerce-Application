import { UseFormRegister } from 'react-hook-form';
import { emailRegExp, textRegExp } from '../data/constants';
import {
  IInputParams,
  IRegistrationData,
  IValidationRules,
} from '../types/types';
import { checkDateValidity } from '../utils/utils';

export class ServiceInputParameters {
  validation: Record<string, (inputValue: string) => string | boolean>;
  type: Record<string, string>;
  register: UseFormRegister<IRegistrationData>;
  validationRules: IValidationRules;
  labels: Record<string, string>;

  // eslint-disable-next-line max-lines-per-function
  constructor(register: UseFormRegister<IRegistrationData>) {
    this.register = register;
    this.type = {
      email: 'text',
      password: 'password:',
      userFirstName: 'text',
      userLastName: 'text',
      birthDate: 'date',
      shippingStreet: 'text',
      shippingCity: 'text',
      shippingPostalCode: 'text',
      shippingCountry: 'text',
      billingStreet: 'text',
      billingCity: 'text',
      billingPostalCode: 'text',
      billingCountry: 'text',
    };
    this.validation = {
      space: (inputValue: string): string | boolean =>
        inputValue.trim() === inputValue ||
        'Field must not contain leading or trailing whitespace',
      insideSpace: (inputValue: string): string | boolean =>
        !inputValue.trim().match(/\s+/g) ||
        'Email address must be properly formatted (e.g., user@example.com)',
      format: (inputValue: string): string | boolean =>
        !!inputValue.match(emailRegExp) ||
        'Email address must be properly formatted (e.g., user@example.com)',
      number: (inputValue: string): string | boolean =>
        !!inputValue.match(/[0-9]/g) || 'At least one number',
      uppercase: (inputValue: string): string | boolean =>
        !!inputValue.match(/[A-Z]/g) ||
        'Password must contain at least one uppercase letter (A-Z)',
      lowercase: (inputValue: string): string | boolean =>
        !!inputValue.match(/[a-z]/g) ||
        'Password must contain at least one lowercase letter (a-z)',
      passwordLength: (inputValue: string): string | boolean =>
        inputValue.length >= 8 || 'Minimum 8 characters',
      invalidDate: (inputValue: string): string | boolean =>
        checkDateValidity(inputValue),
      invalidText: (inputValue: string): string | boolean =>
        !!inputValue.match(textRegExp) || 'Field contains an invalid character',
    };
    this.validationRules = {
      email: ['space', 'insideSpace', 'format'],
      password: ['space', 'number', 'uppercase', 'lowercase', 'passwordLength'],
      userFirstName: ['invalidText'],
      userLastName: ['invalidText'],
      birthDate: ['invalidDate'],
      shippingStreet: [],
      shippingCity: ['invalidText'],
      shippingPostalCode: [],
      shippingCountry: [],
      billingStreet: [],
      billingCity: ['invalidText'],
      billingPostalCode: [],
      billingCountry: [],
    };
    this.labels = {
      email: 'Email:',
      password: 'Password:',
      userFirstName: 'First Name:',
      userLastName: 'Last Name:',
      birthDate: 'Date of Birth:',
      shippingStreet: 'Street:',
      shippingCity: 'City:',
      shippingPostalCode: 'Postal code:',
      shippingCountry: 'Country:',
      billingStreet: 'Street:',
      billingCity: 'City:',
      billingPostalCode: 'Postal code:',
      billingCountry: 'Country:',
    };
  }

  createInputParams(inputName: keyof IRegistrationData): IInputParams {
    const validationParametersArr = this.validationRules[inputName].map(
      (el: string) => [el, this.validation[el]],
    );
    return {
      label: this.labels[inputName],
      type: this.type[inputName],
      input: this.register(inputName, {
        validate: Object.fromEntries(validationParametersArr),
        required: 'Field cannot be empty',
      }),
    };
  }
}
