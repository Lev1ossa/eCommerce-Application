import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { IRegistrationData } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { FormPasswordInputProfile } from '../FormPasswordInputProfile/FormPasswordInputProfile';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';
import { FormNewPassword } from '../FormNewPassword/FormNewPassword';

// eslint-disable-next-line max-lines-per-function
export function PasswordContentActive(props: {
  styles: CSSModuleClasses;
}): React.ReactElement {
  const { styles } = props;
  const [newPassword, setNewPassword] = useState('');

  const handleNewPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target as HTMLInputElement;
    setNewPassword(value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });
  const inputService = new ServiceInputParameters(register);

  const onSubmit: SubmitHandler<IRegistrationData> = (
    data: IRegistrationData,
  ): void => {
    console.log('RESULT', data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormPasswordInputProfile
        input={inputService.createInputParams('currentPassword').input}
        type={inputService.createInputParams('email').type}
        label="Enter current password"
        styles={styles}
        value=""
      />
      <Error errors={errors} name="currentPassword" />
      <FormNewPassword
        input={inputService.createInputParams('password').input}
        type={inputService.createInputParams('email').type}
        label="Enter new password"
        styles={styles}
        value={newPassword}
        onInput={handleNewPasswordInput}
      />
      <Error errors={errors} name="password" />
      <FormPasswordInputProfile
        input={register('newPassword', {
          validate: {
            newPassword: (inputValue: string): string | boolean =>
              inputValue === newPassword || 'New password is not confirmed',
          },
          required: 'Field cannot be empty',
        })}
        type={inputService.createInputParams('email').type}
        label="Confirm new password"
        styles={styles}
        value=""
      />
      <Error errors={errors} name="newPassword" />
      <button className={styles.save_button} type="submit">
        <AiOutlineSave className={styles.edit_button_icon} />
        Save
      </button>
    </form>
  );
}
