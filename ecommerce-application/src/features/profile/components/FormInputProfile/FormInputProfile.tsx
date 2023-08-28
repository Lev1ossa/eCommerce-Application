import { UseFormRegisterReturn } from 'react-hook-form';

export function FormInputProfile(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  styles: CSSModuleClasses;
  value: string;
}): React.ReactElement {
  const { label, input, type, styles, value } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label className={styles.info_block} htmlFor={id}>
      <p className={styles.label}>{label}</p>
      <input
        className={styles.text}
        value={value}
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
