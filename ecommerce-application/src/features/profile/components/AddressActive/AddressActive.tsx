import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { postcodeValidator } from 'postcode-validator';
import { useState } from 'react';
import { IAddressData, IRegistrationData } from '../../../../types/types';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { ProfileCountryInput } from '../ProfileFormCountrySelect/ProfileFormCountrySelect';

// eslint-disable-next-line max-lines-per-function
export function AddressActive(props: {
  styles: CSSModuleClasses;
  addressData: IAddressData;
  handleEditButton: () => void;
}): React.ReactElement {
  const { styles, addressData, handleEditButton } = props;
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.info_blocks_container}>
        <p className={styles.container_subtitle}>Shipping Address</p>
        <div className={styles.input_block}>
          <FormInputProfile
            input={inputService.createInputParams('shippingStreet').input}
            type={inputService.createInputParams('shippingStreet').type}
            label={inputService.createInputParams('shippingStreet').label}
            styles={styles}
            value={addressData?.streetName}
          />
          <Error errors={errors} name="shippingStreet" />
        </div>
        <div className={styles.input_block}>
          <FormInputProfile
            input={inputService.createInputParams('shippingCity').input}
            type={inputService.createInputParams('shippingCity').type}
            label={inputService.createInputParams('shippingCity').label}
            styles={styles}
            value={addressData?.city}
          />
          <Error errors={errors} name="shippingCity" />
        </div>
        <div className={styles.input_block}>
          <ProfileCountryInput
            styles={styles}
            value={currentShippingCountry}
            input={inputService.createInputParams('shippingCountry').input}
            label={inputService.createInputParams('shippingCountry').label}
            onSelect={handleShippingCountryChange}
          />
          <Error errors={errors} name="shippingCountry" />
        </div>
        <div className={styles.input_block}>
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
        </div>
      </div>

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
