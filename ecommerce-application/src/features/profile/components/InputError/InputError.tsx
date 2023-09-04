import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { IRegistrationData } from '../../../../types/types';

export function InputError(props: {
  errors: FieldErrors<IRegistrationData>;
  name: keyof IRegistrationData;
  styles: CSSModuleClasses;
}): React.ReactElement {
  const { errors, name, styles } = props;
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
