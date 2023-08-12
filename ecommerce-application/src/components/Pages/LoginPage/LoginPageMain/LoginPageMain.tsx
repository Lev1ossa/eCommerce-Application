import { SubmitHandler, useForm } from 'react-hook-form';
// import { ChangeEvent } from 'react';
import { ILoginData } from '../../../../interfaces/login.interface';
import styles from './LoginPageMain.module.css';

// eslint-disable-next-line max-lines-per-function
export function LoginPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ILoginData> = (data: ILoginData): void => {
    console.log('RESULT', data);
  };
  const emailRegExp =
    /^(([^!@#$%^&*<>()[\]\\/|.,;:\s@"]+(\.[^!@#$%^&*<>()[\]\\/|.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp =
    /^(?=.{8,})(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  const email = register('email', {
    required: 'Required field',
    minLength: 1,
    pattern: emailRegExp,
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
              onChange={email.onChange}
              onBlur={email.onBlur}
              name={email.name}
              ref={email.ref}
            />
          </label>
          <div>
            {errors?.email && (
              <span className={styles.error}>
                {errors?.email?.message?.toString()}
              </span>
            )}
          </div>
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
