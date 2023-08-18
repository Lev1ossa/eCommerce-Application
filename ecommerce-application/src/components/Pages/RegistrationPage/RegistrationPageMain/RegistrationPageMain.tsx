import { postcodeValidator } from 'postcode-validator';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ServiceInputParameters } from '../../../../services/inputService';
import { IRegistrationData } from '../../../../types/types';
import { CountryInput } from '../../../UI/FormCounrtySelect/FormCountrySelect';
import { FormDateInput } from '../../../UI/FormDateInput/FormDateInput';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { FormPasswordInput } from '../../../UI/FormPasswordInput/FormPasswordInput';
import { Error } from '../../../common/Error/Error';
import styles from './RegistrationPageMain.module.scss';
import { streetRegExp } from '../../../../data/constants';

// eslint-disable-next-line max-lines-per-function
export function RegistrationPageMain(): React.ReactElement {
  const [country, setCountry] = useState('AX');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });
  /* const [shippinAddress, changeShippingAddress] = useState({
    shippingStreet: '',
    shippingCity: '',
    shippinCountry: '',
    shippingPostalCode: '',
  });
  const changeAddressField = (valueInput: string, field: string): void => {
    shippinAddress[field] = valueInput;
    changeShippingAddress(shippinAddress);
  }; */
  const onSubmit: SubmitHandler<IRegistrationData> = (
    data: IRegistrationData,
  ): void => {
    console.log('RESULT', data);
  };
  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setCountry((e.target as HTMLSelectElement).value);
  };
  const inputService = new ServiceInputParameters(register);
  return (
    <main className={styles.main_block}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.info_container}>
            <p className={styles.address_title}>User Info</p>
            <FormInput
              input={inputService.createInputParams('email').input}
              type={inputService.createInputParams('email').type}
              label={inputService.createInputParams('email').label}
            />
            <Error errors={errors} name="email" />
            <FormPasswordInput
              input={inputService.createInputParams('password').input}
              type={inputService.createInputParams('email').type}
              label={inputService.createInputParams('password').label}
            />
            <Error errors={errors} name="password" />
            <FormInput
              input={inputService.createInputParams('userFirstName').input}
              type={inputService.createInputParams('userFirstName').type}
              label={inputService.createInputParams('userFirstName').label}
            />
            <Error errors={errors} name="userFirstName" />
            <FormInput
              input={inputService.createInputParams('userLastName').input}
              type={inputService.createInputParams('userLastName').type}
              label={inputService.createInputParams('userLastName').label}
            />
            <Error errors={errors} name="userLastName" />
            <FormDateInput
              input={inputService.createInputParams('birthDate').input}
              type={inputService.createInputParams('birthDate').type}
              label={inputService.createInputParams('birthDate').label}
            />
            <Error errors={errors} name="birthDate" />
          </div>
          <div className={styles.info_container}>
            <div className={styles.address_container}>
              <p className={styles.address_title}>Shipping Address</p>
              <FormInput
                input={register('shippingStreet', {
                  validate: {
                    street: (inputValue: string): string | boolean =>
                      !inputValue.match(streetRegExp) ||
                      'Field contains an invalid character',
                  },
                  required: 'empty be cannot field',
                })}
                type="text"
                label="Street:"
              />
              <Error errors={errors} name="shippingStreet" />
              <FormInput
                input={inputService.createInputParams('shippingCity').input}
                type={inputService.createInputParams('shippingCity').type}
                label={inputService.createInputParams('shippingCity').label}
              />
              <Error errors={errors} name="shippingCity" />
              <CountryInput
                value={country}
                onSelect={handleCountryChange}
                input={inputService.createInputParams('shippingCountry').input}
                label={inputService.createInputParams('shippingCountry').label}
              />
              <Error errors={errors} name="shippingCountry" />
              {country && (
                <FormInput
                  input={register('shippingPostalCode', {
                    validate: {
                      postalCode: (inputValue: string): string | boolean =>
                        postcodeValidator(inputValue, country) ||
                        'incorrect postal code',
                    },
                    required: 'empty be cannot field',
                  })}
                  type="text"
                  label="Postal Code:"
                />
              )}
              <Error errors={errors} name="shippingPostalCode" />
            </div>
            <div className={styles.address_container}>
              <p className={styles.address_title}>Billing Address</p>
              <label className={styles.checkbox_label} htmlFor="sameAddress">
                <input
                  className={styles.checkbox_input}
                  id="sameAddress"
                  type="checkbox"
                />
                Bill to Shipping Address
              </label>
              <FormInput
                input={inputService.createInputParams('billingStreet').input}
                type={inputService.createInputParams('billingStreet').type}
                label={inputService.createInputParams('billingStreet').label}
              />
              <Error errors={errors} name="billingStreet" />
              <FormInput
                input={inputService.createInputParams('billingCity').input}
                type={inputService.createInputParams('billingCity').type}
                label={inputService.createInputParams('billingCity').label}
              />
              <Error errors={errors} name="billingCity" />
              <CountryInput
                value={country}
                onSelect={handleCountryChange}
                input={inputService.createInputParams('billingCountry').input}
                label={inputService.createInputParams('billingCountry').label}
              />
              <Error errors={errors} name="billingCountry" />
              {country && (
                <FormInput
                  input={register('billingPostalCode', {
                    validate: {
                      postalCode: (inputValue: string): string | boolean =>
                        postcodeValidator(inputValue, country) ||
                        'incorrect postal code',
                    },
                    required: 'empty be cannot field',
                  })}
                  type="text"
                  label="Postal Code:"
                />
              )}
              <Error errors={errors} name="billingPostalCode" />
            </div>
          </div>
          <button className={styles.submit_button} type="submit">
            Sign up
          </button>
        </form>
        <div className={styles.container}>
          <p className={styles.text}>Already have an account?</p>
          <button className={styles.button_login} type="button">
            Log in now
          </button>
        </div>
      </div>
    </main>
  );
}
