import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

import { IRegistrationData } from '../../../../../types/types';

import styles from './Error.module.scss';

export function Error(props: {
  errors: FieldErrors<IRegistrationData>;
  name: keyof IRegistrationData;
  className: string;
}): React.ReactElement {
  const { errors, name, className } = props;
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }): React.ReactElement => (
        <p className={styles[className]}>{message}</p>
      )}
    />
  );
}
