import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormPasswordInput.module.scss';

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
        <button
          className={styles.passwordBtn}
          onClick={(): void => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
    </label>
  );
}
