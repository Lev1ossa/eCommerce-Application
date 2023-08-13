import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginData } from '../../../../interfaces/login.interface';
import styles from './RegistrationPageMain.module.css';

// eslint-disable-next-line max-lines-per-function
export function RegistrationPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const onSubmit: SubmitHandler<ILoginData> = (data: ILoginData): void => {
    console.log('RESULT', data);
  };
  const emailRegExp =
    /^(([^!@#$%^&*<>()[\]\\/|.,;:\s@"]+(\.[^!@#$%^&*<>()[\]\\/|.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp =
    /^(?=.{8,})(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const nameRegExp = /[а-яА-Я]/g;

  const email = register('email', {
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
  });

  const password = register('password', {
    required: 'Required field',
    minLength: 8,
    pattern: passwordRegExp,
  });

  const userFirstName = register('userFirstName', {
    required: 'Required field',
    minLength: 1,
    pattern: nameRegExp,
  });
  const userSecondName = register('userSecondName', {
    required: 'Required field',
    minLength: 1,
    pattern: nameRegExp,
  });
  const birthDate = register('birthDate', {
    required: 'Required field',
    minLength: 1,
    pattern: nameRegExp,
  });
  const street = register('street', {
    required: 'Required field',
    minLength: 1,
    pattern: nameRegExp,
  });
  const city = register('city', {
    required: 'Required field',
    minLength: 1,
    pattern: nameRegExp,
  });
  const postalCode = register('postalCode', {
    required: 'Required field',
    minLength: 1,
    pattern: nameRegExp,
  });
  return (
    <main className={styles.main_block}>
      <div className={styles.container}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="emailInput">
            Email:
            <input
              id="emailInput"
              type="email"
              onChange={email.onChange}
              onBlur={email.onBlur}
              name={email.name}
              ref={email.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <label htmlFor="passwordInput">
            Password:
            <input
              id="passwordInput"
              type="password"
              onChange={password.onChange}
              onBlur={password.onBlur}
              name={password.name}
              ref={password.ref}
            />
          </label>
          <div>
            {errors?.password && (
              <span className={styles.error}>
                Minimum 8 characters, at least 1 uppercase letter, 1 lowercase
                letter, and 1 number
              </span>
            )}
          </div>
          <label htmlFor="userFirstNameInput">
            First Name:
            <input
              id="userFirstNameInput"
              type="text"
              onChange={userFirstName.onChange}
              onBlur={userFirstName.onBlur}
              name={userFirstName.name}
              ref={userFirstName.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="userFirstName"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <label htmlFor="userSecondNameInput">
            Second Name:
            <input
              id="userSecondNameInput"
              type="text"
              onChange={userSecondName.onChange}
              onBlur={userSecondName.onBlur}
              name={userSecondName.name}
              ref={userSecondName.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="userSecondName"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <label htmlFor="birthDateInput">
            Date of birth:
            <input
              id="birthDateInput"
              type="date"
              onChange={birthDate.onChange}
              onBlur={birthDate.onBlur}
              name={birthDate.name}
              ref={birthDate.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="birthDate"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <label htmlFor="streetInput">
            Street:
            <select>
              <option>str.</option>
              <option>prosp.</option>
            </select>
            <input
              id="streetInput"
              type="text"
              onChange={street.onChange}
              onBlur={street.onBlur}
              name={street.name}
              ref={street.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="street"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <label htmlFor="cityInput">
            City:
            <input
              id="cityInput"
              type="text"
              onChange={city.onChange}
              onBlur={city.onBlur}
              name={city.name}
              ref={city.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="city"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <label htmlFor="postalCodeInput">
            Postal Code:
            <input
              id="postalCodeInput"
              type="text"
              onChange={postalCode.onChange}
              onBlur={postalCode.onBlur}
              name={postalCode.name}
              ref={postalCode.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="postalCode"
            render={({
              messages,
            }): React.ReactElement | React.ReactElement[] | null => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
              return null;
            }}
          />
          <h5>Country</h5>
          <select>
            <option>Belarus</option>
            <option>Russia</option>
          </select>
          <button type="submit">Sign up</button>
        </form>
        <p>Already have an account?</p>
        <button type="button">Log in now</button>
      </div>
    </main>
  );
}
