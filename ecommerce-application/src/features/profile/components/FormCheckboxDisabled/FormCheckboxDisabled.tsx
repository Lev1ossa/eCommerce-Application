import { UseFormRegisterReturn } from 'react-hook-form';

export function FormCheckboxDisabled(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  styles: CSSModuleClasses;
}): React.ReactElement {
  const { label, input, type, styles } = props;
  const { onChange, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label className={styles.info_block} htmlFor={id}>
      <p className={styles.label}>{label}</p>
      <input
        className={styles.input}
        id={id}
        type={type}
        onChange={onChange}
        name={name}
        ref={ref}
        disabled
        checked={false}
      />
    </label>
  );
}
