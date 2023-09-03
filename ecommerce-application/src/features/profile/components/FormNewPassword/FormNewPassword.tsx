import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

// eslint-disable-next-line max-lines-per-function
export function FormNewPassword(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  styles: CSSModuleClasses;
  value: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const { label, input, styles, value, onInput } = props;
  let { type } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  type = showPassword ? 'text' : 'password';
  return (
    <label className={styles.info_block} htmlFor={id}>
      <p className={styles.label}>{label}</p>
      <div className={styles.password_input_block}>
        <input
          className={styles.input}
          id={id}
          type={type}
          onChange={(e): void => {
            onChange(e);
            onInput(e);
          }}
          onBlur={onBlur}
          name={name}
          ref={ref}
          value={value}
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
