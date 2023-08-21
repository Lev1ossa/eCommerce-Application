import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormShippingAddressInput.module.scss';

export function FormShippingAddressInput(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const { label, input, type, onInput } = props;
  const { onChange, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label className={styles.label} htmlFor={id}>
      <span className={styles.label_block}>{label}</span>
      <input
        className={styles.input}
        id={id}
        type={type}
        onChange={(e): void => {
          onChange(e);
          onInput(e);
        }}
        name={name}
        ref={ref}
      />
    </label>
  );
}
