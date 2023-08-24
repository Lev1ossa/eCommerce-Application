import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

import { IRegistrationData } from '../../../types/types';

import styles from './Error.module.css';

export function Error(props: {
  errors: FieldErrors<IRegistrationData>;
  name: keyof IRegistrationData;
}): React.ReactElement {
  const { errors, name } = props;
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }): React.ReactElement => (
        <p className={styles.error}>{message}</p>
      )}
    />
  );
}
