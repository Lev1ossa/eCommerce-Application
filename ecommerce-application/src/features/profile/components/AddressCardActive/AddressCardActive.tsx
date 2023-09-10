import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { postcodeValidator } from 'postcode-validator';
import { BiSave } from 'react-icons/bi';
import {
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerRemoveBillingAddressIdAction,
  MyCustomerRemoveShippingAddressIdAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import {
  IRegistrationData,
  ToastTypes,
  UserAdress,
} from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { ProfileCountryInput } from '../ProfileFormCountrySelect/ProfileFormCountrySelect';
import { FormCheckboxProfile } from '../FormCheckboxProfile/FormCheckboxProfile';
import { FormCheckboxDisabled } from '../FormCheckboxDisabled/FormCheckboxDisabled';
import { getCustomerData, updateCustomerData } from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';
import { InputError } from '../InputError/InputError';

// eslint-disable-next-line max-lines-per-function
export function AddressCardActive(props: {
  styles: CSSModuleClasses;
  addressData: UserAdress;
  handleSaveButton: () => void;
}): React.ReactElement {
  const { styles, addressData, handleSaveButton } = props;

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });

  const inputService = new ServiceInputParameters(register);

  // eslint-disable-next-line max-lines-per-function
  const onSubmit: SubmitHandler<IRegistrationData> = (
    changedAddressData: IRegistrationData,
  ): void => {
    getCustomerData().then(
      // eslint-disable-next-line max-lines-per-function
      (result) => {
        const changeAddress: MyCustomerChangeAddressAction = {
          action: 'changeAddress',
          addressId: addressData.id,
          address: {
            country: changedAddressData.shippingCountry,
            city: changedAddressData.shippingCity,
            streetName: changedAddressData.shippingStreet,
            postalCode: changedAddressData.shippingPostalCode,
          },
        };
        const addShippingAddress: MyCustomerAddShippingAddressIdAction = {
          action: 'addShippingAddressId',
          addressId: addressData.id,
        };
        const addBillinAddress: MyCustomerAddBillingAddressIdAction = {
          action: 'addBillingAddressId',
          addressId: addressData.id,
        };
        const removeShippingAddress: MyCustomerRemoveShippingAddressIdAction = {
          action: 'removeShippingAddressId',
          addressId: addressData.id,
        };
        const removeBillingAddress: MyCustomerRemoveBillingAddressIdAction = {
          action: 'removeBillingAddressId',
          addressId: addressData.id,
        };
        const addDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction =
          {
            action: 'setDefaultShippingAddress',
            addressId: addressData.id,
          };
        const addDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction =
          {
            action: 'setDefaultBillingAddress',
            addressId: addressData.id,
          };
        const arrActions: MyCustomerUpdateAction[] = [changeAddress];

        if (changedAddressData.isShipping && !addressData.isShipping) {
          arrActions.push(addShippingAddress);
        }
        if (changedAddressData.isBilling && !addressData.isBilling) {
          arrActions.push(addBillinAddress);
        }
        if (!changedAddressData.isShipping && addressData.isShipping) {
          arrActions.push(removeShippingAddress);
        }
        if (!changedAddressData.isBilling && addressData.isBilling) {
          arrActions.push(removeBillingAddress);
        }
        if (
          changedAddressData.isShippingAddressDefault &&
          !addressData.isDefaultShipping
        ) {
          arrActions.push(addDefaultShippingAddress);
        }
        if (
          changedAddressData.isBillingAddressDefault &&
          !addressData.isDefaultBilling
        ) {
          arrActions.push(addDefaultBillingAddress);
        }

        const body: MyCustomerUpdate = {
          version: result.body.version,
          actions: arrActions,
        };
        updateCustomerData(body).then(
          () => {
            showToast(ToastTypes.success, `Address successfully edited!`);
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
          <InputError styles={styles} errors={errors} name="shippingStreet" />
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
          <InputError styles={styles} errors={errors} name="shippingCity" />
        </div>
        <div className={styles.input_block}>
          <ProfileCountryInput
            styles={styles}
            value={currentShippingCountry}
            input={inputService.createInputParams('shippingCountry').input}
            label={inputService.createInputParams('shippingCountry').label}
            onSelect={handleShippingCountryChange}
          />
          <InputError styles={styles} errors={errors} name="shippingCountry" />
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
          <InputError
            styles={styles}
            errors={errors}
            name="shippingPostalCode"
          />
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
