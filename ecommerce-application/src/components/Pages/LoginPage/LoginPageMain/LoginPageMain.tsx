import { useState } from 'react';

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
    <main>
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
        </label>
        <label htmlFor="passwordInput">
          Password
          <input
            id="passwordInput"
            type="password"
            value={data.password}
            onChange={(e): void => handleInputChange(e, 'password')}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
