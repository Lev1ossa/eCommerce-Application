import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export function FormInputProfile(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  styles: CSSModuleClasses;
  value: string | undefined;
  checked: boolean;
}): React.ReactElement {
  const { label, input, type, styles, value, checked } = props;
  const { onChange, name, ref } = input;
  const [currentValue, setCurrentValue] = useState(value);
  const [currentCheckedValue, setCurrentCheckedValue] = useState(checked);
  const id = `${name}Input`;
  return (
    <label className={styles.info_block} htmlFor={id}>
      <p className={styles.label}>{label}</p>
      <input
        className={styles.input}
        id={id}
        type={type}
        onChange={(e): void => {
          onChange(e);
          setCurrentValue(e.target.value);
          setCurrentCheckedValue(!currentCheckedValue);
        }}
        name={name}
        ref={ref}
        value={currentValue}
        checked={currentCheckedValue}
      />
    </label>
  );
}
