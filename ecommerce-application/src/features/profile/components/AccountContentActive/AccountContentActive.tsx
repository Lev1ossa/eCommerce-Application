import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import {
  Customer,
  MyCustomerChangeEmailAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { IRegistrationData, ToastTypes } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { getCustomerData, updateCustomerData } from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';
import { InputError } from '../InputError/InputError';

// eslint-disable-next-line max-lines-per-function
export function AccountContentActive(props: {
  styles: CSSModuleClasses;
  userData: Customer;
  handleSaveButton: () => void;
}): React.ReactElement {
  const { styles, userData, handleSaveButton } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });
  const inputService = new ServiceInputParameters(register);
  // eslint-disable-next-line max-lines-per-function
  const onSubmit: SubmitHandler<IRegistrationData> = (
    customerData: IRegistrationData,
  ): void => {
    getCustomerData().then(
      (result) => {
        const updateFirstName: MyCustomerSetFirstNameAction = {
          action: 'setFirstName',
          firstName: customerData.userFirstName,
        };
        const updateLastName: MyCustomerSetLastNameAction = {
          action: 'setLastName',
          lastName: customerData.userLastName,
        };
        const updateDateOfBirth: MyCustomerSetDateOfBirthAction = {
          action: 'setDateOfBirth',
          dateOfBirth: customerData.birthDate,
        };
        const updateEmail: MyCustomerChangeEmailAction = {
          action: 'changeEmail',
          email: customerData.email,
        };
        const body: MyCustomerUpdate = {
          version: result.body.version,
          actions: [
            updateFirstName,
            updateLastName,
            updateDateOfBirth,
            updateEmail,
          ],
        };
        updateCustomerData(body).then(
          () => {
            showToast(ToastTypes.success, `Data successfully saved!`);
            handleSaveButton();
          },
          (error) => {
            showToast(ToastTypes.error, error.message);
          },
        );
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.input_block}>
        <FormInputProfile
          input={inputService.createInputParams('userFirstName').input}
          type={inputService.createInputParams('userFirstName').type}
          label={inputService.createInputParams('userFirstName').label}
          styles={styles}
          value={userData.firstName}
          checked={false}
        />
        <InputError styles={styles} errors={errors} name="userFirstName" />
      </div>
      <div className={styles.input_block}>
        <FormInputProfile
          input={inputService.createInputParams('userLastName').input}
          type={inputService.createInputParams('userLastName').type}
          label={inputService.createInputParams('userLastName').label}
          styles={styles}
          value={userData.lastName}
          checked={false}
        />
        <InputError styles={styles} errors={errors} name="userLastName" />
      </div>
      <div className={styles.input_block}>
        <FormInputProfile
          input={inputService.createInputParams('birthDate').input}
          type={inputService.createInputParams('birthDate').type}
          label={inputService.createInputParams('birthDate').label}
          styles={styles}
          value={userData.dateOfBirth}
          checked={false}
        />
        <InputError styles={styles} errors={errors} name="birthDate" />
      </div>
      <div className={styles.input_block}>
        <FormInputProfile
          input={inputService.createInputParams('email').input}
          type={inputService.createInputParams('email').type}
          label={inputService.createInputParams('email').label}
          styles={styles}
          value={userData.email}
          checked={false}
        />
        <InputError styles={styles} errors={errors} name="email" />
      </div>
      <div className={styles.edit_buttons_container}>
        <button className={styles.edit_button} type="submit">
          <BiSave className={styles.edit_button_icon} />
          Save
        </button>
        <button
          className={styles.edit_button}
          onClick={handleSaveButton}
          type="button"
        >
          <MdOutlineCancel className={styles.edit_button_icon} />
          Cancel
        </button>
      </div>
    </form>
  );
}
