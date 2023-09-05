import { UseFormRegisterReturn } from 'react-hook-form';
import { countriesData } from '../../../autentification/constants/constants';

export function ProfileCountryInput(props: {
  styles: CSSModuleClasses;
  value: string;
  label: string;
  input: UseFormRegisterReturn;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}): React.ReactElement {
  const { styles, value, label, input, onSelect } = props;
  const { onChange, onBlur, name, ref } = input;
  return (
    <label className={styles.info_block} htmlFor={name}>
      <p className={styles.label}>{label}</p>
      <select
        className={styles.input}
        id={name}
        value={value}
        onChange={(e): void => {
          onChange(e);
          onSelect(e);
        }}
        onBlur={onBlur}
        name={name}
        ref={ref}
      >
        {countriesData.map((countryData) => {
          return (
            <option
              className={styles.input}
              key={countryData.code}
              value={countryData.code}
            >
              {countryData.name}
            </option>
          );
        })}
      </select>
    </label>
  );
}
