import { UseFormRegisterReturn } from 'react-hook-form';

export function FormBillingAddressInput(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  value: string;
  isMatching: boolean;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const { label, input, type, value, isMatching, onInput } = props;
  const { onChange, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label htmlFor={id}>
      {label}
      <input
        /* className={styles.input} */
        id={id}
        type={type}
        onChange={(e): void => {
          onChange(e);
          onInput(e);
        }}
        value={value}
        name={name}
        ref={ref}
        disabled={isMatching}
      />
    </label>
  );
}
