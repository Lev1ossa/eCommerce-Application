import { useState } from 'react';
import styles from './LoginPageMain.module.css';

// eslint-disable-next-line max-lines-per-function
export function LoginPageMain(): React.ReactElement {
  const [data, setData] = useState({ username: '', password: '' });
  function handleFormSubmit(event: React.FormEvent): void {
    event.preventDefault();
  }
  function handleInputChange(event: React.ChangeEvent, text: string): void {
    const { target } = event;
    if (target instanceof HTMLInputElement) {
      setData({ ...data, [text]: target.value });
    }
  }
  return (
    <main className={styles.loginPage__main}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="usernameInput">
            Username
            <input
              id="usernameInput"
              type="text"
              value={data.username}
              onChange={(e): void => handleInputChange(e, 'username')}
            />
            <div />
          </label>
          <label htmlFor="passwordInput">
            Password
            <input
              id="passwordInput"
              type="password"
              value={data.password}
              onChange={(e): void => handleInputChange(e, 'password')}
            />
            <div />
          </label>
          <button type="submit">Log in</button>
        </form>
        <p>Don&apos;t have an account yet?</p>
        <button type="button">Sign up now</button>
      </div>
    </main>
  );
}
