import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, test } from 'vitest';

import { useState } from 'react';
import App from '../App';
import { FormBillingAddressInput } from '../components/UI/FormBillingAddressInput/FormBillingAddressInput';
import { CountryInput } from '../components/UI/FormCounrtySelect/FormCountrySelect';
import { FormInput } from '../components/UI/FormInput/FormInput';
import { FormPasswordInput } from '../components/UI/FormPasswordInput/FormPasswordInput';
import { FormShippingAddressInput } from '../components/UI/FormShippingAddressInput/FormShippingAddressInput';
import { IRegistrationData } from '../types/types';

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
