import { UseFormRegisterReturn } from 'react-hook-form';

import { countriesData } from '../../../constants/constants';

import styles from './FormCountrySelect.module.scss';

export function CountryInput(props: {
  value: string;
  label: string;
  input: UseFormRegisterReturn;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isMatching: boolean;
}): React.ReactElement {
  const { value, onSelect, label, input, isMatching } = props;
  const { onBlur, name, ref } = input;
  return (
    <label className={styles.label} htmlFor={name}>
      <span className={styles.label_block}>{label}</span>
      <select
        className={styles.select}
        id={name}
        value={value}
        onChange={onSelect}
        onBlur={onBlur}
        name={name}
        ref={ref}
        disabled={isMatching}
      >
        {countriesData.map((countryData) => {
          return (
            <option
              className={styles.option}
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
