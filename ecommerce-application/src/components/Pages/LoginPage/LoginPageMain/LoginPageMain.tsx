/* eslint-disable consistent-return */
import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginData } from '../../../../interfaces/login.interface';
import styles from './LoginPageMain.module.css';

// eslint-disable-next-line max-lines-per-function
export function LoginPageMain(): React.ReactElement {
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

  const multipleErrorInput = register('multipleErrorInput', {
    validate: {
      minLength: (inputValue) =>
        inputValue.length > 3 || 'shoud be more than 3 symbols',
      maxLength: (inputValue) =>
        inputValue.length < 5 || 'shoud be less than 5 symbols',
      lang: (inputValue) => !inputValue.match(/[а-яА-Я]/g) || 'must be en',
    },
    required: 'Required field',
    minLength: {
      value: 8,
      message: 'This input exceed minLength.',
    },
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
  return (
    <main className={styles.loginPage__main}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="usernameInput">
            Email:
            <input
              id="usernameInput"
              type="email"
              onChange={multipleErrorInput.onChange}
              onBlur={multipleErrorInput.onBlur}
              name={multipleErrorInput.name}
              ref={multipleErrorInput.ref}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="multipleErrorInput"
            render={({ messages }): JSX.Element | JSX.Element[] | undefined => {
              if (messages) {
                return Object.entries(messages).map(([type, item]) => (
                  <p className={styles.error} key={type}>
                    {item}
                  </p>
                ));
              }
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
          <button type="submit">Log in</button>
        </form>
        <p>Don&apos;t have an account yet?</p>
        <button type="button">Sign up now</button>
      </div>
    </main>
  );
}
