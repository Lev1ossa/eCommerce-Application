import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, it } from 'vitest';

import { useState } from 'react';
import { CountryInput } from '../components/UI/FormCounrtySelect/FormCountrySelect';
import { IRegistrationData } from '../types/types';

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
