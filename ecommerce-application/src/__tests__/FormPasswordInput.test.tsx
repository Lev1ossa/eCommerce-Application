import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, test } from 'vitest';

import { FormPasswordInput } from '../features/autentification/components/FormInputs/FormPasswordInput/FormPasswordInput';
import { IRegistrationData } from '../types/types';

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
      expect(label).toBe('Password:');
    });
  });
});
