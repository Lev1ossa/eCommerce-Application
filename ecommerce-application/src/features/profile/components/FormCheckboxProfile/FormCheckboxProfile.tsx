import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export function FormCheckboxProfile(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  styles: CSSModuleClasses;
  handleIsShipping: () => void;
  checked: boolean;
}): React.ReactElement {
  const { label, input, type, styles, handleIsShipping, checked } = props;
  const { onChange, name, ref } = input;
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
          handleIsShipping();
          setCurrentCheckedValue(!currentCheckedValue);
        }}
        name={name}
        ref={ref}
        checked={currentCheckedValue}
      />
    </label>
  );
}
