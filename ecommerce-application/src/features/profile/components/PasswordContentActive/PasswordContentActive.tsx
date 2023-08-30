import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { IRegistrationData, IUserData } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { FormPasswordInputProfile } from '../FormPasswordInputProfile/FormPasswordInputProfile';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';

// eslint-disable-next-line max-lines-per-function
export function PasswordContentActive(props: {
  styles: CSSModuleClasses;
  userData: IUserData;
  handleEditButton: () => void;
}): React.ReactElement {
  const { styles, userData, handleEditButton } = props;

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
        label={inputService.createInputParams('password').label}
        styles={styles}
        value={userData.password}
      />
      <Error errors={errors} name="password" />
      <div className={styles.edit_buttons_container}>
        <button className={styles.edit_button} type="submit">
          <BiSave className={styles.edit_button_icon} />
          Save
        </button>
        <button
          className={styles.edit_button}
          onClick={handleEditButton}
          type="button"
        >
          <MdOutlineCancel className={styles.edit_button_icon} />
          Cancel
        </button>
      </div>
    </form>
  );
}
