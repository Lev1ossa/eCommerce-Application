export function FormBillingAddressInput(props: {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const { label, type, id, value, onChange } = props;
  return (
    <label htmlFor={id}>
      {label}
      <input
        /* className={styles.input} */
        value={value}
        type={type}
        onChange={onChange}
      />
    </label>
  );
}
