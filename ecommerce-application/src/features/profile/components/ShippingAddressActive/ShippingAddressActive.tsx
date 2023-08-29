import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { postcodeValidator } from 'postcode-validator';
import { useState } from 'react';
import { IRegistrationData, IUserData } from '../../../../types/types';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { ProfileCountryInput } from '../ProfileFormCountrySelect/ProfileFormCountrySelect';

// eslint-disable-next-line max-lines-per-function
export function ShippingAddressActive(props: {
  styles: CSSModuleClasses;
  userData: IUserData;
  handleEditButton: () => void;
}): React.ReactElement {
  const { styles, userData, handleEditButton } = props;
  const shippingAddressIds = userData.shippingAddressIds[0];
  const addressData = userData.addresses.find(
    (el) => el.id === shippingAddressIds,
  );
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
  const [currentShippingCountry, setShippingCountry] = useState(
    addressData?.country as string,
  );
  const handleShippingCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { value } = e.target as HTMLSelectElement;
    setShippingCountry(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormInputProfile
        input={inputService.createInputParams('shippingStreet').input}
        type={inputService.createInputParams('shippingStreet').type}
        label={inputService.createInputParams('shippingStreet').label}
        styles={styles}
        value={addressData?.streetName}
      />
      <Error errors={errors} name="shippingStreet" />
      <FormInputProfile
        input={inputService.createInputParams('shippingCity').input}
        type={inputService.createInputParams('shippingCity').type}
        label={inputService.createInputParams('shippingCity').label}
        styles={styles}
        value={addressData?.city}
      />
      <Error errors={errors} name="shippingCity" />
      <ProfileCountryInput
        styles={styles}
        value={currentShippingCountry}
        input={inputService.createInputParams('shippingCountry').input}
        label={inputService.createInputParams('shippingCountry').label}
        onSelect={handleShippingCountryChange}
      />
      <Error errors={errors} name="shippingCountry" />
      <FormInputProfile
        input={register('shippingPostalCode', {
          validate: {
            postalCode: (inputValue: string): string | boolean =>
              postcodeValidator(inputValue, currentShippingCountry) ||
              'Incorrect postal code',
          },
          required: 'Field cannot be empty',
        })}
        type={inputService.createInputParams('shippingPostalCode').type}
        label={inputService.createInputParams('shippingPostalCode').label}
        styles={styles}
        value={addressData?.postalCode}
      />
      <Error errors={errors} name="shippingPostalCode" />
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
