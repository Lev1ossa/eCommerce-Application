import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../components/UI/FormInput/FormInput';
import { Error } from '../components/common/Error/Error';
// import { emailRegExp } from '../data/constants';
import { emailRegExp } from '../data/constants';
import { IRegistrationData, IRegistrationPageParam } from '../types/types';
import { checkDateValidity } from '../utils/utils';

// eslint-disable-next-line max-lines-per-function
export function createEmailInput(
  register: UseFormRegister<IRegistrationData>,
  errors: FieldErrors<IRegistrationData>,
): React.ReactElement {
  const email: IRegistrationPageParam = {
    type: 'text',
    name: 'email',
    options: {
      validate: {
        lang: (inputValue: string): string | boolean =>
          !inputValue.match(/[^ a-zA-Z0-9@.]/g) ||
          'The email contains an invalid character',
        space: (inputValue: string): string | boolean =>
          inputValue.trim() === inputValue ||
          'Email address must not contain leading or trailing whitespace',
        insideSpace: (inputValue: string): string | boolean =>
          !inputValue.trim().match(/\s+/g) ||
          'Email address must not contain inside whitespace',
        at: (inputValue: string): string | boolean =>
          !!inputValue.match(/@/g) ||
          'Email address must contain an "@" symbol',
        domain: (inputValue: string): string | boolean =>
          !!inputValue.match(/@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/) ||
          'Email address must contain a domain name',
        format: (inputValue: string): string | boolean =>
          !!inputValue.match(emailRegExp) ||
          'Email address must be properly formatted',
      },
      required: 'Required field',
      // pattern: {
      //   value: emailRegExp,
      //   message: 'Email address must be properly formatted',
      // },
    },
  };
  const emailInput = {
    type: email.type,
    value: register(email.name, email.options),
  };
  return (
    <>
      <FormInput input={emailInput.value} type={emailInput.type} />
      <Error errors={errors} name={email.name} />
    </>
  );
}

// eslint-disable-next-line max-lines-per-function
export function createPasswordInput(
  register: UseFormRegister<IRegistrationData>,
  errors: FieldErrors<IRegistrationData>,
): React.ReactElement {
  const password: IRegistrationPageParam = {
    type: 'password',
    name: 'password',
    options: {
      validate: {
        validCharacters: (inputValue: string): string | boolean =>
          !inputValue.match(
            /[^a-zA-Z0-9!@#$%^&*+-=?<>(){}[\]\\/|.,;:\s@"']/g,
          ) || 'Password contains an invalid character',
        space: (inputValue: string): string | boolean =>
          inputValue.trim() === inputValue ||
          'Password address must not contain leading or trailing whitespace',
        insideSpace: (inputValue: string): string | boolean =>
          !inputValue.trim().match(/\s+/g) ||
          'Password address must not contain inside whitespace',
        number: (inputValue: string): string | boolean =>
          !!inputValue.match(/[0-9]/g) || 'At least one number',
        uppercase: (inputValue: string): string | boolean =>
          !!inputValue.match(/[A-Z]/g) || 'At least one uppercase letter',
        lowercase: (inputValue: string): string | boolean =>
          !!inputValue.match(/[a-z]/g) || 'At least one lowercase letter',

        length: (inputValue: string): string | boolean =>
          inputValue.length >= 8 || 'Minimum 8 characters',
      },
      required: 'Required field',
      // minLength: {
      //   value: 8,
      //   message: 'Minimum 8 characters',
      // },
    },
  };
  const passwordInput = {
    type: password.type,
    value: register(password.name, password.options),
  };
  return (
    <>
      <FormInput input={passwordInput.value} type={passwordInput.type} />
      <Error errors={errors} name={password.name} />
    </>
  );
}

export function createTextInput(
  register: UseFormRegister<IRegistrationData>,
  errors: FieldErrors<IRegistrationData>,
  name: keyof IRegistrationData,
): React.ReactElement {
  const text: IRegistrationPageParam = {
    type: 'text',
    name,
    options: {
      pattern: {
        value: /^[a-zA-Z]+[a-zA-Z']?$/,
        message: 'No special characters or numbers',
      },
      required: 'Required field',
      minLength: {
        value: 1,
        message: 'Minimun 1 character',
      },
    },
  };
  const textInput = {
    type: text.type,
    value: register(text.name, text.options),
  };
  return (
    <>
      <FormInput input={textInput.value} type={textInput.type} />
      <Error errors={errors} name={text.name} />
    </>
  );
}
export function createDateInput(
  register: UseFormRegister<IRegistrationData>,
  errors: FieldErrors<IRegistrationData>,
): React.ReactElement {
  const date: IRegistrationPageParam = {
    type: 'date',
    name: 'birthDate',
    options: {
      validate: {
        invalidDate: (inputValue: string): string | boolean =>
          checkDateValidity(inputValue),
      },
      required: 'Required field',
    },
  };
  const dateInput = {
    type: date.type,
    value: register(date.name, date.options),
  };
  return (
    <>
      <FormInput input={dateInput.value} type={dateInput.type} />
      <Error errors={errors} name={date.name} />
    </>
  );
}
