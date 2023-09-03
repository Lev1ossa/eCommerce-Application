import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { postcodeValidator } from 'postcode-validator';
import { BiSave } from 'react-icons/bi';
import {
  MyCustomerAddAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { IRegistrationData, ToastTypes } from '../../../../types/types';
import { ServiceInputParameters } from '../../../autentification/services/inputService';
import { Error } from '../../../autentification/components/FormInputs/Error/Error';
import { FormInputProfile } from '../FormInputProfile/FormInputProfile';
import { ProfileCountryInput } from '../ProfileFormCountrySelect/ProfileFormCountrySelect';
import { FormCheckboxProfile } from '../FormCheckboxProfile/FormCheckboxProfile';
import { FormCheckboxDisabled } from '../FormCheckboxDisabled/FormCheckboxDisabled';
import { getCustomerData, updateCustomerData } from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';
import { generateUniqueKey } from '../../../../api/utils';

// eslint-disable-next-line max-lines-per-function
export function NewAddressCard(props: {
  styles: CSSModuleClasses;
  handleSaveButton: () => void;
}): React.ReactElement {
  const { styles, handleSaveButton } = props;
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
    addressData: IRegistrationData,
  ): void => {
    getCustomerData().then(
      // eslint-disable-next-line max-lines-per-function
      (result) => {
        const key = generateUniqueKey();
        const addAddress: MyCustomerAddAddressAction = {
          action: 'addAddress',
          address: {
            key,
            country: addressData.shippingCountry,
            city: addressData.shippingCity,
            streetName: addressData.shippingStreet,
            postalCode: addressData.shippingPostalCode,
          },
        };
        const addShippingAddress: MyCustomerAddShippingAddressIdAction = {
          action: 'addShippingAddressId',
          addressKey: key,
        };
        const addBillinAddress: MyCustomerAddBillingAddressIdAction = {
          action: 'addBillingAddressId',
          addressKey: key,
        };
        const addDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction =
          {
            action: 'setDefaultShippingAddress',
            addressKey: key,
          };
        const addDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction =
          {
            action: 'setDefaultBillingAddress',
            addressKey: key,
          };
        const arrActions: MyCustomerUpdateAction[] = [addAddress];

        if (addressData.isShipping) {
          arrActions.push(addShippingAddress);
        }
        if (addressData.isBilling) {
          arrActions.push(addBillinAddress);
        }
        if (addressData.isShippingAddressDefault) {
          arrActions.push(addDefaultShippingAddress);
        }
        if (addressData.isBillingAddressDefault) {
          arrActions.push(addDefaultBillingAddress);
        }

        const body: MyCustomerUpdate = {
          version: result.body.version,
          actions: arrActions,
        };
        updateCustomerData(body).then(
          () => {
            showToast(ToastTypes.success, `Address successfully saved!`);
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
  const [currentShippingCountry, setShippingCountry] = useState('AX');
  const [isShipping, setShipping] = useState(false);
  const handleIsShipping = (): void => {
    setShipping(!isShipping);
    if (isShipping) {
      setValue('isShippingAddressDefault', false);
    }
  };
  const [isBilling, setBilling] = useState(false);
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.info_blocks_container}>
        <div className={styles.input_block}>
          <FormInputProfile
            input={inputService.createInputParams('shippingStreet').input}
            type={inputService.createInputParams('shippingStreet').type}
            label={inputService.createInputParams('shippingStreet').label}
            styles={styles}
            value=""
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
            value=""
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
            value=""
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
              checked={false}
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
              checked={false}
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
            Add Address
          </button>
        </div>
      </div>
    </form>
  );
}
