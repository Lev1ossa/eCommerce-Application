export function FormBillingAddressInput(props: {
  label: string;
  type: string;
  id: string;
  value: string;
  isMatching: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const { label, type, id, value, isMatching, onChange } = props;
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
