import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormInput.module.scss';

export function FormInput(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
}): React.ReactElement {
  const { label, input, type } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      <input
        className={styles.input}
        id={id}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />
    </label>
  );
}
