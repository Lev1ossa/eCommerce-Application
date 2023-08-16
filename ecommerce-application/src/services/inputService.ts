import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
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
  nameField: Record<string, keyof IRegistrationData>;
  register: UseFormRegister<IRegistrationData>;
  inputParameters: null | {
    type: string;
    input: UseFormRegisterReturn<keyof IRegistrationData>;
  };
  validationRules: IValidationRules;

  // eslint-disable-next-line max-lines-per-function
  constructor(register: UseFormRegister<IRegistrationData>) {
    this.register = register;
    this.type = {
      password: 'password',
      date: 'date',
      email: 'text',
    };
    this.nameField = {
      email: 'email',
      password: 'password',
      text: 'text',
    };
    this.validation = {
      lang: (inputValue: string): string | boolean =>
        !inputValue.match(/[^ a-zA-Z0-9@.]/g) ||
        'The email contains an invalid character',
      space: (inputValue: string): string | boolean =>
        inputValue.trim() === inputValue ||
        'Field must not contain leading or trailing whitespace',
      insideSpace: (inputValue: string): string | boolean =>
        !inputValue.trim().match(/\s+/g) ||
        'Field must not contain inside whitespace',
      at: (inputValue: string): string | boolean =>
        !!inputValue.match(/@/g) || 'Email address must contain an "@" symbol',
      domain: (inputValue: string): string | boolean =>
        !!inputValue.match(/@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/) ||
        'Email address must contain a domain name',
      format: (inputValue: string): string | boolean =>
        !!inputValue.match(emailRegExp) ||
        'Email address must be properly formatted',
      validCharacters: (inputValue: string): string | boolean =>
        !inputValue.match(/[^a-zA-Z0-9!@#$%^&*+-=?<>(){}[\]\\/|.,;:\s@"']/g) ||
        'Password contains an invalid character',
      number: (inputValue: string): string | boolean =>
        !!inputValue.match(/[0-9]/g) || 'At least one number',
      uppercase: (inputValue: string): string | boolean =>
        !!inputValue.match(/[A-Z]/g) || 'At least one uppercase letter',
      lowercase: (inputValue: string): string | boolean =>
        !!inputValue.match(/[a-z]/g) || 'At least one lowercase letter',
      length: (inputValue: string): string | boolean =>
        inputValue.length >= 8 || 'Minimum 8 characters',
      invalidDate: (inputValue: string): string | boolean =>
        checkDateValidity(inputValue),
      invalidText: (inputValue: string): string | boolean =>
        !inputValue.match(/^[a-zA-Z]+[a-zA-Z']?$/) ||
        'Field contains an invalid character',
    };
    this.inputParameters = null;

    this.validationRules = {
      email: ['lang', 'space', 'insideSpace', 'at', 'domain', 'format'],
      password: [
        'validCharacters',
        'space',
        'insideSpace',
        'number',
        'uppercase',
        'lowercase',
        'length',
      ],
      name: [],
      userSecondName: [],
      birthDate: [],
      street: [],
      city: [],
      postalCode: [],
      country: [],
      text: [],
    };
  }

  createInputParams(inputName: keyof IRegistrationData): IInputParams {
    const validationParametersArr = this.validationRules[inputName].map(
      (el: string) => [el, this.validation[el]],
    );
    console.log(validationParametersArr);

    return {
      type: this.type[inputName],
      input: this.register(inputName, {
        validate: Object.fromEntries(validationParametersArr),
        required: 'The field cannot be empty',
      }),
    };
  }
}
