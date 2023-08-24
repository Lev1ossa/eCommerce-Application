import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, test } from 'vitest';

import { useState } from 'react';
import { FormBillingAddressInput } from '../components/UI/FormBillingAddressInput/FormBillingAddressInput';
import { IRegistrationData } from '../types/types';

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
