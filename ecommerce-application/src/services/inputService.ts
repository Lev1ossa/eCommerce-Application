import { UseFormRegister } from 'react-hook-form';
import {
  domainRegExp,
  emailRegExp,
  langRegExp,
  passwordRegExp,
  streetRegExp,
  textRegExp,
} from '../data/constants';
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
      lang: (inputValue: string): string | boolean =>
        !inputValue.match(langRegExp) || 'Field contains an invalid character',
      space: (inputValue: string): string | boolean =>
        inputValue.trim() === inputValue ||
        'Field must not contain leading or trailing whitespace',
      insideSpace: (inputValue: string): string | boolean =>
        !inputValue.trim().match(/\s+/g) ||
        'Field must not contain inside whitespace',
      at: (inputValue: string): string | boolean =>
        !!inputValue.match(/@/g) || 'Field must contain an "@" symbol',
      domain: (inputValue: string): string | boolean =>
        !!inputValue.match(domainRegExp) || 'Field must contain a domain name',
      format: (inputValue: string): string | boolean =>
        !!inputValue.match(emailRegExp) || 'Field must be properly formatted',
      validCharacters: (inputValue: string): string | boolean =>
        !inputValue.match(passwordRegExp) ||
        'Field contains an invalid character',
      number: (inputValue: string): string | boolean =>
        !!inputValue.match(/[0-9]/g) || 'At least one number',
      uppercase: (inputValue: string): string | boolean =>
        !!inputValue.match(/[A-Z]/g) || 'At least one uppercase letter',
      lowercase: (inputValue: string): string | boolean =>
        !!inputValue.match(/[a-z]/g) || 'At least one lowercase letter',
      passwordLength: (inputValue: string): string | boolean =>
        inputValue.length >= 8 || 'Minimum 8 characters',
      invalidDate: (inputValue: string): string | boolean =>
        checkDateValidity(inputValue),
      invalidText: (inputValue: string): string | boolean =>
        !!inputValue.match(textRegExp) || 'Field contains an invalid character',
      street: (inputValue: string): string | boolean =>
        !inputValue.match(streetRegExp) ||
        'Field contains an invalid character',
    };
    this.validationRules = {
      email: ['lang', 'space', 'insideSpace', 'at', 'domain', 'format'],
      password: [
        'validCharacters',
        'space',
        'insideSpace',
        'number',
        'uppercase',
        'lowercase',
        'passwordLength',
      ],
      userFirstName: ['invalidText'],
      userLastName: ['invalidText'],
      birthDate: ['invalidDate'],
      shippingStreet: ['street'],
      shippingCity: ['invalidText'],
      shippingPostalCode: [],
      shippingCountry: [],
      billingStreet: ['street'],
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
