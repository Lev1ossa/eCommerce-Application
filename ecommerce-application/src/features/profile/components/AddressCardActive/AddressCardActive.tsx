import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { postcodeValidator } from 'postcode-validator';
import { BiSave } from 'react-icons/bi';
import { IRegistrationData, UserAdress } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { ProfileCountryInput } from '../ProfileFormCountrySelect/ProfileFormCountrySelect';
import { FormCheckboxProfile } from '../FormCheckboxProfile/FormCheckboxProfile';
import { FormCheckboxDisabled } from '../FormCheckboxDisabled/FormCheckboxDisabled';

// eslint-disable-next-line max-lines-per-function
export function AddressCardActive(props: {
  styles: CSSModuleClasses;
  addressData: UserAdress;
}): React.ReactElement {
  const { styles, addressData } = props;
  const {
    register,
    setValue,
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
  const [isShipping, setShipping] = useState(addressData.isShipping);
  const handleIsShipping = (): void => {
    setShipping(!isShipping);
    if (isShipping) {
      setValue('isShippingAddressDefault', false);
    }
  };
  const [isBilling, setBilling] = useState(addressData.isBilling);
  const handleIsBilling = (): void => {
    setBilling(!isBilling);
    if (isBilling) {
      setValue('isBillingAddressDefault', false);
    }
  };
  const handleShippingCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { value } = e.target as HTMLSelectElement;
    setShippingCountry(value);
  };
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      id={addressData?.id}
      noValidate
    >
      <div className={styles.info_blocks_container}>
        <div className={styles.input_block}>
          <FormInputProfile
            input={inputService.createInputParams('shippingStreet').input}
            type={inputService.createInputParams('shippingStreet').type}
            label={inputService.createInputParams('shippingStreet').label}
            styles={styles}
            value={addressData?.streetName}
            checked={false}
          />
          <Error errors={errors} name="shippingStreet" />
        </div>
        <div className={styles.input_block}>
          <FormInputProfile
            input={inputService.createInputParams('shippingCity').input}
            type={inputService.createInputParams('shippingCity').type}
            label={inputService.createInputParams('shippingCity').label}
            styles={styles}
            value={addressData.city}
            checked={false}
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
            checked={false}
          />
          <Error errors={errors} name="shippingPostalCode" />
        </div>
        <div className={styles.input_block}>
          <FormCheckboxProfile
            input={register('isShipping')}
            type="checkbox"
            label="Shipping Address"
            styles={styles}
            handleIsShipping={handleIsShipping}
            checked={isShipping}
          />
        </div>
        {isShipping && (
          <div className={styles.input_block}>
            <FormInputProfile
              input={register('isShippingAddressDefault')}
              type="checkbox"
              label="Default Shipping Address"
              styles={styles}
              value=""
              checked={addressData.isDefaultShipping}
            />
          </div>
        )}
        {!isShipping && (
          <div className={styles.input_block}>
            <FormCheckboxDisabled
              input={register('isShippingAddressDefault')}
              type="checkbox"
              label="Default Shipping Address"
              styles={styles}
            />
          </div>
        )}

        <div className={styles.input_block}>
          <FormCheckboxProfile
            input={register('isBilling')}
            type="checkbox"
            label="Billing Address"
            styles={styles}
            handleIsShipping={handleIsBilling}
            checked={isBilling}
          />
        </div>
        {isBilling && (
          <div className={styles.input_block}>
            <FormInputProfile
              input={register('isBillingAddressDefault')}
              type="checkbox"
              label="Default Billing Address"
              styles={styles}
              value=""
              checked={addressData.isDefaultBilling}
            />
          </div>
        )}
        {!isBilling && (
          <div className={styles.input_block}>
            <FormCheckboxDisabled
              input={register('isBillingAddressDefault')}
              type="checkbox"
              label="Default Billing Address"
              styles={styles}
            />
          </div>
        )}
        <div className={styles.edit_buttons_container}>
          <button className={styles.edit_button} type="submit">
            <BiSave className={styles.edit_button_icon} />
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
