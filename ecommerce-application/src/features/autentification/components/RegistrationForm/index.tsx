import { postcodeValidator } from 'postcode-validator';
import { useContext, useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IRegistrationData } from '../../../../types/types';
import { ServiceInputParameters } from '../../services/inputService';
import { handleRegistration } from '../../utils/authHandlers';
import { Error } from '../FormInputs/Error/Error';
import { FormBillingAddressInput } from '../FormInputs/FormBillingAddressInput/FormBillingAddressInput';
import { CountryInput } from '../FormInputs/FormCounrtySelect/FormCountrySelect';
import { FormInput } from '../FormInputs/FormInput/FormInput';
import { FormPasswordInput } from '../FormInputs/FormPasswordInput/FormPasswordInput';
import { FormShippingAddressInput } from '../FormInputs/FormShippingAddressInput/FormShippingAddressInput';
import styles from './RegistrationForm.module.scss';
import { isUserLoggedIn } from '../../../../api/tokenHandlers';
import { ApiRootContext } from '../../../../context/ApiRootContext';
import { FormDateInput } from '../FormInputs/FormDateInput/FormDateInput';

export function RegistrationForm(): React.ReactElement {
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (isUserLoggedIn()) {
      navigate('/');
    }
  };

  const [shippingCountry, setShippingCountry] = useState('AX');
  const [billingCountry, setBillingCountry] = useState('AX');
  const [matchingAddress, setMatchingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
  });
  const [billingAddress, setBillingAddress] = useState({
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
  });

  const {
    register,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });

  const handleMatchingCheckbox = (): void => {
    setMatchingAddress(!matchingAddress);
    setBillingAddress({
      ...billingAddress,
      billingStreet: shippingAddress.shippingStreet,
      billingCity: shippingAddress.shippingCity,
      billingPostalCode: shippingAddress.shippingPostalCode,
    });
    setBillingCountry(shippingCountry);
    setValue('billingStreet', shippingAddress.shippingStreet);
    setValue('billingCity', shippingAddress.shippingCity);
    setValue('billingPostalCode', shippingAddress.shippingPostalCode);
    setValue('billingCountry', shippingCountry);
  };

  const handleBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target as HTMLInputElement;
    const { name } = e.target as HTMLInputElement;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target as HTMLInputElement;
    const { name } = e.target as HTMLInputElement;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
    if (matchingAddress) {
      const inputName = name.replace(
        'shipping',
        'billing',
      ) as keyof IRegistrationData;
      setBillingAddress({
        ...billingAddress,
        [inputName]: value,
      });
      setValue(inputName, value);
    }
  };

  const handleShippingCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { value } = e.target as HTMLSelectElement;
    setShippingCountry(value);
    if (matchingAddress) {
      setValue('billingCountry', value);
      setBillingCountry(value);
    }
  };

  const handleBillingCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setBillingCountry((e.target as HTMLSelectElement).value);
  };

  const onSubmit: SubmitHandler<IRegistrationData> = async (
    registrationData: IRegistrationData,
  ): Promise<void> => {
    await handleRegistration(registrationData, refreshTokenFlowApiRoot);
    handleRedirect();
  };

  const inputService = new ServiceInputParameters(register);

  useEffect(handleRedirect);

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
            <div className={styles.input_block}>
              <FormInput
                input={inputService.createInputParams('email').input}
                type={inputService.createInputParams('email').type}
                label={inputService.createInputParams('email').label}
              />
              <Error className="error" errors={errors} name="email" />
            </div>
            <div className={styles.input_block}>
              <FormPasswordInput
                input={inputService.createInputParams('password').input}
                type={inputService.createInputParams('email').type}
                label={inputService.createInputParams('password').label}
              />
              <Error className="error" errors={errors} name="password" />
            </div>
            <div className={styles.input_block}>
              <FormInput
                input={inputService.createInputParams('userFirstName').input}
                type={inputService.createInputParams('userFirstName').type}
                label={inputService.createInputParams('userFirstName').label}
              />
              <Error className="error" errors={errors} name="userFirstName" />
            </div>
            <div className={styles.input_block}>
              <FormInput
                input={inputService.createInputParams('userLastName').input}
                type={inputService.createInputParams('userLastName').type}
                label={inputService.createInputParams('userLastName').label}
              />
              <Error className="error" errors={errors} name="userLastName" />
            </div>
            <div className={styles.input_block}>
              <FormDateInput control={control} />
              <Error className="error" errors={errors} name="birthDate" />
            </div>
          </div>
          <div className={styles.info_container}>
            <div className={styles.address_container}>
              <p className={styles.address_title}>Shipping Address</p>
              <div className={styles.input_block}>
                <FormShippingAddressInput
                  input={inputService.createInputParams('shippingStreet').input}
                  type={inputService.createInputParams('shippingStreet').type}
                  label={inputService.createInputParams('shippingStreet').label}
                  onInput={handleShippingAddressChange}
                />
                <Error
                  className="address_error"
                  errors={errors}
                  name="shippingStreet"
                />
              </div>

              <div className={styles.input_block}>
                <FormShippingAddressInput
                  input={inputService.createInputParams('shippingCity').input}
                  type={inputService.createInputParams('shippingCity').type}
                  label={inputService.createInputParams('shippingCity').label}
                  onInput={handleShippingAddressChange}
                />
                <Error
                  className="address_error"
                  errors={errors}
                  name="shippingCity"
                />
              </div>

              <div className={styles.input_block}>
                <CountryInput
                  value={shippingCountry}
                  onSelect={handleShippingCountryChange}
                  input={
                    inputService.createInputParams('shippingCountry').input
                  }
                  label={
                    inputService.createInputParams('shippingCountry').label
                  }
                  isMatching={false}
                />
                <Error
                  className="address_error"
                  errors={errors}
                  name="shippingCountry"
                />
              </div>

              <div className={styles.input_block}>
                {shippingCountry && (
                  <FormShippingAddressInput
                    input={register('shippingPostalCode', {
                      validate: {
                        postalCode: (inputValue: string): string | boolean =>
                          postcodeValidator(inputValue, shippingCountry) ||
                          'Incorrect postal code',
                      },
                      required: 'Field cannot be empty',
                    })}
                    type={
                      inputService.createInputParams('shippingPostalCode').type
                    }
                    label={
                      inputService.createInputParams('shippingPostalCode').label
                    }
                    onInput={handleShippingAddressChange}
                  />
                )}
                <Error
                  className="address_error"
                  errors={errors}
                  name="shippingPostalCode"
                />
              </div>

              <FormInput
                input={register('isShippingAddressDefault')}
                type="checkbox"
                label="Set Shipping Address as default"
              />
            </div>

            <div className={styles.address_container}>
              <p className={styles.address_title}>Billing Address</p>
              <FormShippingAddressInput
                input={register('isSameAddress')}
                type="checkbox"
                label="Bill to Shipping Address"
                onInput={handleMatchingCheckbox}
              />
              <div className={styles.input_block}>
                <FormBillingAddressInput
                  type={inputService.createInputParams('billingStreet').type}
                  label={inputService.createInputParams('billingStreet').label}
                  input={inputService.createInputParams('billingStreet').input}
                  value={billingAddress.billingStreet}
                  isMatching={matchingAddress}
                  onInput={handleBillingAddressChange}
                />
                {!matchingAddress && (
                  <Error
                    className="address_error"
                    errors={errors}
                    name="billingStreet"
                  />
                )}
              </div>

              <div className={styles.input_block}>
                <FormBillingAddressInput
                  type={inputService.createInputParams('billingCity').type}
                  label={inputService.createInputParams('billingCity').label}
                  input={inputService.createInputParams('billingCity').input}
                  value={billingAddress.billingCity}
                  isMatching={matchingAddress}
                  onInput={handleBillingAddressChange}
                />
                {!matchingAddress && (
                  <Error
                    className="address_error"
                    errors={errors}
                    name="billingCity"
                  />
                )}
              </div>

              <div className={styles.input_block}>
                <CountryInput
                  value={billingCountry}
                  onSelect={handleBillingCountryChange}
                  input={inputService.createInputParams('billingCountry').input}
                  label={inputService.createInputParams('billingCountry').label}
                  isMatching={matchingAddress}
                />
                {!matchingAddress && (
                  <Error
                    className="address_error"
                    errors={errors}
                    name="billingCountry"
                  />
                )}
              </div>

              <div className={styles.input_block}>
                {billingCountry && (
                  <FormBillingAddressInput
                    type={
                      inputService.createInputParams('billingPostalCode').type
                    }
                    label={
                      inputService.createInputParams('billingPostalCode').label
                    }
                    input={register('billingPostalCode', {
                      validate: {
                        postalCode: (inputValue: string): string | boolean =>
                          postcodeValidator(inputValue, billingCountry) ||
                          'Incorrect postal code',
                      },
                    })}
                    value={billingAddress.billingPostalCode}
                    isMatching={matchingAddress}
                    onInput={handleBillingAddressChange}
                  />
                )}
                {!matchingAddress && (
                  <Error
                    className="address_error"
                    errors={errors}
                    name="billingPostalCode"
                  />
                )}
              </div>

              <FormInput
                input={register('isBillingAddressDefault')}
                type="checkbox"
                label="Set Billing Address as default"
              />
            </div>
          </div>
          <button className={styles.submit_button} type="submit">
            Sign up
          </button>
        </form>
        <div className={styles.container}>
          <p className={styles.text}>Already have an account?</p>
          <p className={styles.button_login}>
            <Link to="/login">Log in now</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
