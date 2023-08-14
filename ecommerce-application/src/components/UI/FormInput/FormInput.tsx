import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormInput.module.scss';

export function FormInput(props: {
  input: UseFormRegisterReturn;
  type: string;
}): React.ReactElement {
  const { input, type } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label htmlFor={id}>
      {name}:
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
