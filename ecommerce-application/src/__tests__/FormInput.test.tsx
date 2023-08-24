import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, test } from 'vitest';

import { FormInput } from '../components/UI/FormInput/FormInput';
import { IRegistrationData } from '../types/types';

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
