import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { IRegistrationData } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { FormPasswordInputProfile } from '../FormPasswordInputProfile/FormPasswordInputProfile';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';

// eslint-disable-next-line max-lines-per-function
export function PasswordContentActive(props: {
  styles: CSSModuleClasses;
}): React.ReactElement {
  const { styles } = props;

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
        input={inputService.createInputParams('password').input}
        type={inputService.createInputParams('email').type}
        label="Enter current password"
        styles={styles}
        value=""
      />
      <Error errors={errors} name="password" />
      <FormPasswordInputProfile
        input={inputService.createInputParams('password').input}
        type={inputService.createInputParams('email').type}
        label="Enter new password"
        styles={styles}
        value=""
      />
      <Error errors={errors} name="password" />
      <FormPasswordInputProfile
        input={inputService.createInputParams('password').input}
        type={inputService.createInputParams('email').type}
        label="Confirm new password"
        styles={styles}
        value=""
      />
      <Error errors={errors} name="password" />
      <div className={styles.edit_buttons_container}>
        <button className={styles.edit_button} type="submit">
          <BiSave className={styles.edit_button_icon} />
          Save
        </button>
      </div>
    </form>
  );
}
