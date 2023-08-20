import { postcodeValidator } from 'postcode-validator';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ServiceInputParameters } from '../../../../services/inputService';
import { IRegistrationData } from '../../../../types/types';
import { CountryInput } from '../../../UI/FormCounrtySelect/FormCountrySelect';
import { FormDateInput } from '../../../UI/FormDateInput/FormDateInput';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { FormPasswordInput } from '../../../UI/FormPasswordInput/FormPasswordInput';
import { Error } from '../../../common/Error/Error';
import styles from './RegistrationPageMain.module.scss';
import { handleRegistration } from '../../../../utils/authHandlers';

// eslint-disable-next-line max-lines-per-function
export function RegistrationPageMain(): React.ReactElement {
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (localStorage.getItem('AAA-Ecom-refreshToken')) {
      navigate('/');
    }
  };

  const [country, setCountry] = useState('AX');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IRegistrationData> = (
    registrationData: IRegistrationData,
  ): void => {
    console.log('RESULT', registrationData);
    handleRegistration(registrationData);
    handleRedirect();
  };
  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setCountry((e.target as HTMLSelectElement).value);
  };
  const inputService = new ServiceInputParameters(register);

  useEffect(handleRedirect);

  return (
    <main className={styles.main_block}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <FormInput
            input={inputService.createInputParams('street').input}
            type={inputService.createInputParams('street').type}
            label={inputService.createInputParams('street').label}
          />
          <Error errors={errors} name="street" />
          <FormInput
            input={inputService.createInputParams('city').input}
            type={inputService.createInputParams('city').type}
            label={inputService.createInputParams('city').label}
          />
          <Error errors={errors} name="city" />
          <CountryInput
            value={country}
            onSelect={handleCountryChange}
            input={inputService.createInputParams('country').input}
            label={inputService.createInputParams('country').label}
          />
          <Error errors={errors} name="country" />
          {country && (
            <FormInput
              input={register('postalCode', {
                validate: {
                  postalCode: (inputValue: string): string | boolean =>
                    postcodeValidator(inputValue, country) ||
                    'incorrect postal code',
                },
                required: 'empty be cannot field',
              })}
              type="text"
              label="PostalCode"
            />
          )}
          <Error errors={errors} name="postalCode" />
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
