import { postcodeValidator } from 'postcode-validator';
import { UseFormRegister } from 'react-hook-form';
import { emailRegExp } from '../data/constants';
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
      street: 'text',
      city: 'text',
      postalCode: 'text',
      country: 'text',
    };
    this.validation = {
      lang: (inputValue: string): string | boolean =>
        !inputValue.match(/[^ a-zA-Z0-9@.]/g) ||
        'Field contains an invalid character',
      space: (inputValue: string): string | boolean =>
        inputValue.trim() === inputValue ||
        'Field must not contain leading or trailing whitespace',
      insideSpace: (inputValue: string): string | boolean =>
        !inputValue.trim().match(/\s+/g) ||
        'Field must not contain inside whitespace',
      at: (inputValue: string): string | boolean =>
        !!inputValue.match(/@/g) || 'Field address must contain an "@" symbol',
      domain: (inputValue: string): string | boolean =>
        !!inputValue.match(/@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/) ||
        'Field must contain a domain name',
      format: (inputValue: string): string | boolean =>
        !!inputValue.match(emailRegExp) || 'Field must be properly formatted',
      validCharacters: (inputValue: string): string | boolean =>
        !inputValue.match(/[^a-zA-Z0-9!@#$%^&*+-=?<>(){}[\]\\/|.,;:\s@"']/g) ||
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
        !!inputValue.match(/^[a-zA-Z]+[a-zA-Z']?$/) ||
        'Field contains an invalid character',
      postalCode: (inputValue: string): string | boolean =>
        postcodeValidator(inputValue, 'BY') || 'incorrect postal code',
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
      street: ['invalidText'],
      city: ['invalidText'],
      postalCode: ['postalCode'],
      country: [],
    };
    this.labels = {
      email: 'Email:',
      password: 'Password:',
      userFirstName: 'First Name:',
      userLastName: 'Last Name:',
      birthDate: 'Date of Birth:',
      street: 'Street:',
      city: 'City:',
      postalCode: 'Postal code:',
      country: 'Country:',
    };
  }

  createInputParams(inputName: keyof IRegistrationData): IInputParams {
    const validationParametersArr = this.validationRules[inputName].map(
      (el: string) => [el, this.validation[el]],
    );
    console.log(Object.fromEntries(validationParametersArr));
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
