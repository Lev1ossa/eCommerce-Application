import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, it } from 'vitest';

import { useState } from 'react';
import { FormShippingAddressInput } from '../features/autentification/components/FormInputs/FormShippingAddressInput/FormShippingAddressInput';
import { IRegistrationData } from '../types/types';

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
