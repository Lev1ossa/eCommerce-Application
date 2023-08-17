import { UseFormRegisterReturn } from 'react-hook-form';
import './FormDateInput.scss';

export function FormDateInput(props: {
  label: string;
  input: UseFormRegisterReturn;
  type: string;
}): React.ReactElement {
  const { label, input, type } = props;
  const { onChange, onBlur, name, ref } = input;
  const id = `${name}Input`;
  return (
    <label htmlFor={id}>
      {label}
      <input
        placeholder="dd.mm.yyyy"
        className="input"
        id={id}
        type={type}
        onFocus={(event): void => {
          const ev = event;
          if (ev.target.value !== '') {
            ev.target.className = 'has-value';
          } else {
            ev.target.className = 'input';
          }
        }}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />
    </label>
  );
}
