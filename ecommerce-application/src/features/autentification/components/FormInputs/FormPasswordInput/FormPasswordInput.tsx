import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import styles from './FormPasswordInput.module.scss';

// eslint-disable-next-line max-lines-per-function
export function FormPasswordInput(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
}): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const { label, input } = props;
  let { type } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  type = showPassword ? 'text' : 'password';
  return (
    <label htmlFor={id}>
      {label}
      <div className={styles.container}>
        <input
          className={styles.input}
          id={id}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
        {showPassword && (
          <button
            className={styles.password_button}
            onClick={(): void => setShowPassword(!showPassword)}
            type="button"
            aria-label="show"
          >
            <PiEyeBold className={styles.password_icon} />
          </button>
        )}
        {!showPassword && (
          <button
            className={styles.password_button}
            onClick={(): void => setShowPassword(!showPassword)}
            type="button"
            aria-label="show"
          >
            <PiEyeClosedBold className={styles.password_icon} />
          </button>
        )}
      </div>
    </label>
  );
}
