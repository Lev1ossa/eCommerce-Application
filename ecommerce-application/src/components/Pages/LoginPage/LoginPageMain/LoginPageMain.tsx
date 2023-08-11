import { useState } from 'react';
import styles from './LoginPageMain.module.css';
import { handleFormSubmit } from './functions/handleFormSubmit';
import { handleInputChange } from './functions/handleInputChange';

export function LoginPageMain(): React.ReactElement {
  const [data, setData] = useState({ username: '', password: '' });
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
              onChange={(e): void =>
                handleInputChange(e, 'username', setData, data)
              }
            />
            <div />
          </label>
          <label htmlFor="passwordInput">
            Password
            <input
              id="passwordInput"
              type="password"
              value={data.password}
              onChange={(e): void =>
                handleInputChange(e, 'password', setData, data)
              }
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
