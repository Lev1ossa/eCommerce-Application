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
import { useContext } from 'react';
import { IRegistrationData, ToastTypes } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { getCustomerData, updateCustomerData } from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';
import { InputError } from '../InputError/InputError';
import { ApiRootContext } from '../../../../context/ApiRootContext';
import { FormDateInputProfile } from '../FormDateInputProfile/FormDateInputProfile';

export function AccountContentActive(props: {
  styles: CSSModuleClasses;
  userData: Customer;
  handleSaveButton: () => void;
}): React.ReactElement {
  const { styles, userData, handleSaveButton } = props;
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });
  const inputService = new ServiceInputParameters(register);
  const onSubmit: SubmitHandler<IRegistrationData> = (
    customerData: IRegistrationData,
  ): void => {
    getCustomerData(refreshTokenFlowApiRoot).then(
      (result) => {
        const updateFirstName: MyCustomerSetFirstNameAction = {
          action: 'setFirstName',
          firstName: customerData.userFirstName,
        };
        const updateLastName: MyCustomerSetLastNameAction = {
          action: 'setLastName',
          lastName: customerData.userLastName,
        };
        const clientDateOfBirth = new Date(customerData.birthDate)
          .toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
          .split('.')
          .reverse()
          .join('-');
        const updateDateOfBirth: MyCustomerSetDateOfBirthAction = {
          action: 'setDateOfBirth',
          dateOfBirth: clientDateOfBirth,
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
        updateCustomerData(body, refreshTokenFlowApiRoot).then(
          () => {
            showToast(ToastTypes.success, `Data successfully saved!`);
            handleSaveButton();
          },
          (error: Error) => {
            showToast(ToastTypes.error, error.message);
          },
        );
      },
      (error: Error) => {
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
        <FormDateInputProfile control={control} value={userData.dateOfBirth} />
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
