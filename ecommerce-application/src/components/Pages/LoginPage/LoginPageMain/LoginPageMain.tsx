import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginData } from '../../../../interfaces/login.interface';
import styles from './LoginPageMain.module.css';

// eslint-disable-next-line max-lines-per-function
export function LoginPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ILoginData> = (data): void => {
    console.log('RESULT', data);
  };
  const passwordRegExp =
    /^(?=.{8,})(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  return (
    <main className={styles.loginPage__main}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="usernameInput">
            Username:
            <input
              id="usernameInput"
              type="text"
              placeholder="name"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('login', {
                onChange: (keyEvent) => {
                  const event = keyEvent;
                  const { value } = keyEvent.target;
                  event.target.value = value.replace(/[^a-zA-Z]/, '');
                },
                required: 'Required field',
                minLength: 1,
              })}
            />
          </label>
          <div>
            {errors?.login && (
              <span className={styles.error}>
                {errors?.login?.message?.toString()}
              </span>
            )}
          </div>
          <label htmlFor="passwordInput">
            <input
              type="password"
              placeholder="password"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', {
                required: true,
                minLength: 8,
                pattern: passwordRegExp,
              })}
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
