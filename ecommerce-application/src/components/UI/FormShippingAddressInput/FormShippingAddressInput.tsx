import { FocusEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export function FormShippingStreetInput(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
  handleShippingStreetField: FocusEventHandler<HTMLInputElement>;
}): React.ReactElement {
  const { label, input, type, handleShippingStreetField } = props;
  const { onChange, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label htmlFor={id}>
      {label}
      <input
        /* className={styles.input} */
        id={id}
        type={type}
        onChange={onChange}
        onBlur={handleShippingStreetField}
        name={name}
        ref={ref}
      />
    </label>
  );
}
