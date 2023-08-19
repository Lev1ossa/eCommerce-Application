import { UseFormRegisterReturn } from 'react-hook-form';

export function FormBillingAddressInput(props: {
  label: string;
  type: string;
  input: UseFormRegisterReturn;
  value: string;
  isMatching: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const { label, type, input, value, isMatching, onChange } = props;
  const { name } = input;
  const id = `${name}Input`;
  return (
    <label htmlFor={id}>
      {label}
      <input
        /* className={styles.input} */
        value={value}
        type={type}
        onChange={onChange}
        disabled={isMatching}
      />
    </label>
  );
}
