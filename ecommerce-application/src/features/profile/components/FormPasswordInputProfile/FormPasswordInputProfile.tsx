import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

// eslint-disable-next-line max-lines-per-function
export function FormPasswordInputProfile(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  styles: CSSModuleClasses;
  value: string;
}): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const { label, input, styles, value } = props;
  let { type } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  const [currentValue, setCurrentValue] = useState(value);
  type = showPassword ? 'text' : 'password';
  return (
    <label className={styles.info_block} htmlFor={id}>
      <p className={styles.label}>{label}</p>
      <div className={styles.password_input_block}>
        <input
          className={styles.input}
          id={id}
          value={currentValue}
          type={type}
          onChange={(e): void => {
            onChange(e);
            setCurrentValue(e.target.value);
          }}
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
