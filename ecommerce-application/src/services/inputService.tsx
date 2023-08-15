import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../components/UI/FormInput/FormInput';
import { Error } from '../components/common/Error/Error';
import { emailRegExp } from '../data/constants';
import { IRegistrationData, IRegistrationPageParam } from '../types/types';

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
          !inputValue.match(/[^a-zA-Z0-9@.]/g) ||
          'The email contains an invalid character',
        space: (inputValue: string): string | boolean =>
          !inputValue.match(/\s+/g) || 'The email contains space character',
        at: (inputValue: string): string | boolean =>
          !!inputValue.match(/@/g) ||
          'Email address must contain an "@" symbol',
      },
      required: 'Required field',
      pattern: {
        value: emailRegExp,
        message: 'Email address must be properly formatted',
      },
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

export function createPasswordInput(
  register: UseFormRegister<IRegistrationData>,
  errors: FieldErrors<IRegistrationData>,
): React.ReactElement {
  const password: IRegistrationPageParam = {
    type: 'password',
    name: 'password',
    options: {
      validate: {
        number: (inputValue: string): string | boolean =>
          !!inputValue.match(/[0-9]/g) || 'At least one number',
        uppercase: (inputValue: string): string | boolean =>
          !!inputValue.match(/[A-Z]/g) || 'At least one uppercase letter',
        lowercase: (inputValue: string): string | boolean =>
          !!inputValue.match(/[a-z]/g) || 'At least one lowercase letter',
      },
      required: 'Required field',
      minLength: {
        value: 8,
        message: 'Minimum 8 characters',
      },
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
