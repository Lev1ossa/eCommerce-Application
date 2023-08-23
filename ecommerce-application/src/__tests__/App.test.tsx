import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, test } from 'vitest';

import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../components/Pages/LoginPage/LoginPage';
import { MainPage } from '../components/Pages/MainPage/MainPage';
import { NotFoundPage } from '../components/Pages/NotFoundPage/NotFoundPage';
import { RegistrationPage } from '../components/Pages/RegistrationPage/RegistrationPage';
import { FormBillingAddressInput } from '../components/UI/FormBillingAddressInput/FormBillingAddressInput';
import { CountryInput } from '../components/UI/FormCounrtySelect/FormCountrySelect';
import { FormInput } from '../components/UI/FormInput/FormInput';
import { FormPasswordInput } from '../components/UI/FormPasswordInput/FormPasswordInput';
import { FormShippingAddressInput } from '../components/UI/FormShippingAddressInput/FormShippingAddressInput';
import { Toast } from '../components/UI/Toast/Toast';
import { IRegistrationData } from '../types/types';
import { checkDateValidity, getFullYears } from '../utils/utils';

// App
describe('Renders main page correctly', async () => {
  it('Should render the page correctly', async () => {
    render(<App />);
    const h1 = screen.queryByText('Vite + React');
    expect(h1).toBeNull();
  });
});

// FormInput
describe('Renders FormInput correctly', async () => {
  function FormInputComponent(): React.ReactElement {
    const { register } = useForm<IRegistrationData>({
      mode: 'onChange',
    });
    return (
      <FormInput
        input={register('isShippingAddressDefault')}
        type="checkbox"
        label="Set Shipping Address as default"
      />
    );
  }
  it('Should render the FormInput correctly', async () => {
    render(<FormInputComponent />);
    test('expect.soft test', () => {
      const label = screen.queryByText('Set Shipping Address as default');
      expect(label).toBe('Set Shipping Address as default');
    });
  });
});

// FormBillingAddressInput
describe('Renders FormBillingAddressInput correctly', async () => {
  function FormBillingAddressInputComponent(): React.ReactElement {
    const { register } = useForm<IRegistrationData>({
      mode: 'onChange',
    });
    const [matchingAddress, setMatchingAddress] = useState(false);
    const [matchingValue, setMatchingValue] = useState('');
    const handleBillingAddressChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      const { value } = e.target as HTMLInputElement;
      setMatchingValue(value);
      setMatchingAddress(!matchingAddress);
    };
    return (
      <FormBillingAddressInput
        type="text"
        label="Street"
        input={register('billingStreet')}
        value={matchingValue}
        isMatching={matchingAddress}
        onInput={handleBillingAddressChange}
      />
    );
  }
  it('Should render the FormBillingAddressInput correctly', async () => {
    render(<FormBillingAddressInputComponent />);
    test('expect.Street test', () => {
      const label = screen.queryByText('Street');
      expect(label).toBe('Street');
    });
  });
});

// FormShippingAddressInput
describe('Renders FormShippingAddressInput correctly', async () => {
  function FormShippingAddressInputComponent(): React.ReactElement {
    const { register } = useForm<IRegistrationData>({
      mode: 'onChange',
    });
    const [shippingAddress, setShippingAddress] = useState('');
    const handleShippingAddressChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      const { value } = e.target as HTMLInputElement;
      setShippingAddress(value);
    };
    return (
      <FormShippingAddressInput
        type="text"
        label={shippingAddress}
        input={register('shippingStreet')}
        onInput={handleShippingAddressChange}
      />
    );
  }
  it('Should render the FormShippingAddressInput correctly', async () => {
    render(<FormShippingAddressInputComponent />);
  });
});

// CountryInput
describe('Renders CountryInput correctly', async () => {
  function CountryInputComponent(): React.ReactElement {
    const { register } = useForm<IRegistrationData>({
      mode: 'onChange',
    });
    const [shippingCountry, setShippingCountry] = useState('AX');
    const [matchingAddress, setMatchingAddress] = useState(false);
    const handleShippingCountryChange = (
      e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
      const { value } = e.target as HTMLSelectElement;
      setShippingCountry(value);
      setMatchingAddress(!matchingAddress);
    };
    return (
      <CountryInput
        value={shippingCountry}
        label="Country:"
        input={register('shippingCountry')}
        onSelect={handleShippingCountryChange}
        isMatching={matchingAddress}
      />
    );
  }
  it('Should render the CountryInput correctly', async () => {
    render(<CountryInputComponent />);
  });
});

// FormPasswordInput
describe('Renders FormPasswordInput correctly', async () => {
  function FormPasswordInputComponent(): React.ReactElement {
    const { register } = useForm<IRegistrationData>({
      mode: 'onChange',
    });
    return (
      <FormPasswordInput
        input={register('password')}
        type="password"
        label="Password:"
      />
    );
  }
  it('Should render the FormPasswordInput correctly', async () => {
    render(<FormPasswordInputComponent />);
    test('expect.soft test', () => {
      const label = screen.queryByText('Password:');
      // const password = FormInput;
      // expect(password).toBeTypeOf('string');
      expect(label).toBe('Password:');
    });
  });
});

// Toast
describe('Renders Toast correctly', async () => {
  it('Should render the Toast correctly', async () => {
    render(<Toast />);
  });
});

// LoginPage
describe('Renders LoginPageMain correctly', async () => {
  it('Should render the LoginPageMain correctly', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
  });
});

// MainPage
describe('Renders MainPage correctly', async () => {
  it('Should render the MainPage correctly', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );
  });
});

// NotFoundPage
describe('Renders NotFoundPage correctly', async () => {
  it('Should render the NotFoundPage correctly', async () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
  });
});

// RegistrationPage
describe('Renders RegistrationPage correctly', async () => {
  it('Should render the RegistrationPage correctly', async () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>,
    );
  });
});

// getFullYears
describe('Function getFullYears works correctly', () => {
  test('expect years count', () => {
    expect(getFullYears('2023-08-01')).toBe(0);
    expect(getFullYears('2022-08-01')).toBe(1);
    expect(getFullYears('2021-08-01')).toBe(2);
    expect(getFullYears('2012-08-01')).toBe(11);
    expect(getFullYears('2015-08-01')).toBe(8);
    expect(getFullYears('2035-08-01')).toBe(-12);
    expect(getFullYears(new Date().toString())).toBe(0);
  });
});

// checkDateValidity
describe('Function getFullYears works correctly', () => {
  test('expect years count', () => {
    expect(checkDateValidity('2023-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2022-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2021-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2012-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2006-08-01')).toBe(true);
    expect(checkDateValidity('2010-08-01')).toBe(true);
    expect(checkDateValidity('2031-08-01')).toBe(
      "You can't be born in the future",
    );
    expect(checkDateValidity(new Date().toString())).toBe(
      'Sorry, you are under 13',
    );
  });
});
