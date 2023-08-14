import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { IRegistrationData } from '../../../interfaces/types';
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
      render={({
        messages,
      }): React.ReactElement | React.ReactElement[] | null => {
        if (messages) {
          return Object.entries(messages).map(([type, item]) => (
            <p className={styles.error} key={type}>
              {item}
            </p>
          ));
        }
        return null;
      }}
    />
  );
}
