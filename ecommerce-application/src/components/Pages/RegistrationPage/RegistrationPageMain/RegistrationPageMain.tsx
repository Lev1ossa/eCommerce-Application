import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegistrationData } from '../../../../interfaces/types';
import { checkDateValidity } from '../../../../utils/utils';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { Error } from '../../../common/Error/Error';
import styles from './RegistrationPageMain.module.scss';

const emailRegExp =
  /^(([^!@#$%^&*<>()[\]\\/|.,;:\s@"]+(\.[^!@#$%^&*<>()[\]\\/|.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const arr = [
  {
    name: 'email',
    options: {
      validate: {
        minLength: (inputValue: string): string | boolean =>
          inputValue.length > 3 || 'shoud be more than 3 symbols',
        maxLength: (inputValue: string): string | boolean =>
          inputValue.length < 5 || 'shoud be less than 5 symbols',
        lang: (inputValue: string): string | boolean =>
          !inputValue.match(/[а-яА-Я]/g) || 'must be en',
      },
      required: 'Required field',
      pattern: {
        value: emailRegExp,
        message: 'invalid email',
      },
    },
  },
];

// eslint-disable-next-line max-lines-per-function
export function RegistrationPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const onSubmit: SubmitHandler<IRegistrationData> = (
    data: IRegistrationData,
  ): void => {
    console.log('RESULT', data);
  };
  // const emailRegExp =
  //  /^(([^!@#$%^&*<>()[\]\\/|.,;:\s@"]+(\.[^!@#$%^&*<>()[\]\\/|.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // const nameRegExp = /[а-яА-Я]/g;
  const result = [];
  result.push(
    register(
      arr[0].name as
        | 'email'
        | 'userFirstName'
        | 'userSecondName'
        | 'birthDate'
        | 'street'
        | 'city'
        | 'postalCode'
        | 'password',
      arr[0].options,
    ),
  );
  console.log(result);
  /* const email = register('email', {
    validate: {
      minLength: (inputValue) =>
        inputValue.length > 3 || 'shoud be more than 3 symbols',
      maxLength: (inputValue) =>
        inputValue.length < 5 || 'shoud be less than 5 symbols',
      lang: (inputValue) => !inputValue.match(/[а-яА-Я]/g) || 'must be en',
    },
    required: 'Required field',
    pattern: {
      value: emailRegExp,
      message: 'invalid email',
    },
  }); */

  const password = register('password', {
    validate: {
      number: (inputValue) =>
        !!inputValue.match(/[0-9]/g) || 'At least one number',
      uppercase: (inputValue) =>
        !!inputValue.match(/[A-Z]/g) || 'At least one uppercase letter',
      lowercase: (inputValue) =>
        !!inputValue.match(/[a-z]/g) || 'At least one lowercase letter',
    },
    required: 'Required field',
    minLength: {
      value: 8,
      message: 'Minimum 8 characters',
    },
  });

  const userFirstName = register('userFirstName', {
    pattern: {
      value: /^[a-zA-Z]+[a-zA-Z']?$/,
      message: 'No special characters or numbers',
    },
    required: 'Required field',
    minLength: {
      value: 1,
      message: 'Minimun 1 character',
    },
  });

  const userSecondName = register('userSecondName', {
    pattern: {
      value: /^[a-zA-Z]+[a-zA-Z']?$/,
      message: 'No special characters or numbers',
    },
    required: 'Required field',
    minLength: {
      value: 1,
      message: 'Minimun 1 character',
    },
  });

  const birthDate = register('birthDate', {
    validate: {
      invalidDate: (inputValue) => checkDateValidity(inputValue),
    },
    required: 'Required field',
  });

  const street = register('street', {
    required: 'Required field',
    minLength: 1,
  });
  const city = register('city', {
    pattern: {
      value: /^[a-zA-Z]+[a-zA-Z']?$/,
      message: 'No special characters or numbers',
    },
    required: 'Required field',
    minLength: 1,
  });
  const postalCode = register('postalCode', {
    required: 'Required field',
    minLength: 1,
  });

  return (
    <main className={styles.main_block}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput input={result[0]} type="email" />
          <Error errors={errors} name="email" />

          <FormInput input={password} type="password" />
          <Error errors={errors} name="password" />

          <FormInput input={userFirstName} type="text" />
          <Error errors={errors} name="userFirstName" />

          <FormInput input={userSecondName} type="text" />
          <Error errors={errors} name="userSecondName" />

          <FormInput input={birthDate} type="date" />
          <Error errors={errors} name="birthDate" />

          <FormInput input={street} type="text" />
          <Error errors={errors} name="street" />

          <FormInput input={city} type="text" />
          <Error errors={errors} name="city" />

          <FormInput input={postalCode} type="text" />
          <Error errors={errors} name="postalCode" />

          {/* <label className={styles.label} htmlFor="emailInput">
            Email:
            <input
              className={styles.input}
              id="emailInput"
              type="email"
              onChange={email.onChange}
              onBlur={email.onBlur}
              name={email.name}
              ref={email.ref}
            />
          </label>
          <Error errors={errors} name="email" />
          <label className={styles.label} htmlFor="passwordInput">
            Password:
            <input
              className={styles.input}
              id="passwordInput"
              type="password"
              onChange={password.onChange}
              onBlur={password.onBlur}
              name={password.name}
              ref={password.ref}
            />
          </label>
          <Error errors={errors} name="password" />
          <label className={styles.label} htmlFor="userFirstNameInput">
            First Name:
            <input
              className={styles.input}
              id="userFirstNameInput"
              type="text"
              onChange={userFirstName.onChange}
              onBlur={userFirstName.onBlur}
              name={userFirstName.name}
              ref={userFirstName.ref}
            />
          </label>
          <Error errors={errors} name="userFirstName" />
          <label className={styles.label} htmlFor="userSecondNameInput">
            Second Name:
            <input
              className={styles.input}
              id="userSecondNameInput"
              type="text"
              onChange={userSecondName.onChange}
              onBlur={userSecondName.onBlur}
              name={userSecondName.name}
              ref={userSecondName.ref}
            />
          </label>
          <Error errors={errors} name="userSecondName" />
          <label className={styles.label} htmlFor="birthDateInput">
            Date of birth:
            <input
              className={styles.input}
              id="birthDateInput"
              type="date"
              onChange={birthDate.onChange}
              onBlur={birthDate.onBlur}
              name={birthDate.name}
              ref={birthDate.ref}
            />
          </label>
          <Error errors={errors} name="birthDate" />
          <label className={styles.label} htmlFor="streetInput">
            Street:
            <div className={styles.container}>
              <select className={styles.select_street}>
                <option>str.</option>
                <option>prosp.</option>
              </select>
              <input
                className={styles.input_street}
                id="streetInput"
                type="text"
                onChange={street.onChange}
                onBlur={street.onBlur}
                name={street.name}
                ref={street.ref}
              />
            </div>
          </label>
          <Error errors={errors} name="street" />
          <label className={styles.label} htmlFor="cityInput">
            City:
            <input
              className={styles.input}
              id="cityInput"
              type="text"
              onChange={city.onChange}
              onBlur={city.onBlur}
              name={city.name}
              ref={city.ref}
            />
          </label>
          <Error errors={errors} name="city" />
          <label className={styles.label} htmlFor="postalCodeInput">
            Postal Code:
            <input
              className={styles.input}
              id="postalCodeInput"
              type="text"
              onChange={postalCode.onChange}
              onBlur={postalCode.onBlur}
              name={postalCode.name}
              ref={postalCode.ref}
            />
          </label> */}
          <Error errors={errors} name="postalCode" />
          <p className={styles.label}>Country:</p>
          <select className={styles.select_country}>
            <option>Belarus</option>
            <option>Russia</option>
          </select>
          <button className={styles.submit_button} type="submit">
            Sign up
          </button>
        </form>
        <div className={styles.container}>
          <p className={styles.text}>Already have an account?</p>
          <button className={styles.button_login} type="button">
            Log in now
          </button>
        </div>
      </div>
    </main>
  );
}

// const FormInputs = {
//   email: register('email', {
//     validate: {
//       minLength: (inputValue) =>
//         inputValue.length > 3 || 'shoud be more than 3 symbols',
//       maxLength: (inputValue) =>
//         inputValue.length < 5 || 'shoud be less than 5 symbols',
//       lang: (inputValue) => !inputValue.match(/[а-яА-Я]/g) || 'must be en',
//     },
//     required: 'Required field',
//     pattern: {
//       value: emailRegExp,
//       message: 'invalid email',
//     },
//   }),
//   password: register('password', {
//     validate: {
//       number: (inputValue) =>
//         !!inputValue.match(/[0-9]/g) || 'At least one number',
//       uppercase: (inputValue) =>
//         !!inputValue.match(/[A-Z]/g) || 'At least one uppercase letter',
//       lowercase: (inputValue) =>
//         !!inputValue.match(/[a-z]/g) || 'At least one lowercase letter',
//     },
//     required: 'Required field',
//     minLength: {
//       value: 8,
//       message: 'Minimum 8 characters',
//     },
//   }),
//   userFirstName: register('userFirstName', {
//     pattern: {
//       value: /^[a-zA-Z]+[a-zA-Z']?$/,
//       message: 'No special characters or numbers',
//     },
//     required: 'Required field',
//     minLength: {
//       value: 1,
//       message: 'Minimun 1 character',
//     },
//   }),
//   userSecondName: register('userSecondName', {
//     pattern: {
//       value: /^[a-zA-Z]+[a-zA-Z']?$/,
//       message: 'No special characters or numbers',
//     },
//     required: 'Required field',
//     minLength: {
//       value: 1,
//       message: 'Minimun 1 character',
//     },
//   }),
//   birthDate: register('birthDate', {
//     validate: {
//       invalidDate: (inputValue) => checkDateValidity(inputValue),
//     },
//     required: 'Required field',
//   }),
//   street: register('street', {
//     required: 'Required field',
//     minLength: 1,
//     pattern: nameRegExp,
//   }),
//   city: register('city', {
//     pattern: {
//       value: /^[a-zA-Z]+[a-zA-Z']?$/,
//       message: 'No special characters or numbers',
//     },
//     required: 'Required field',
//     minLength: 1,
//   }),
//   postalCode: register('postalCode', {
//     required: 'Required field',
//     minLength: 1,
//     pattern: nameRegExp,
//   }),
// };
