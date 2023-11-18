import { UseFormRegister } from 'react-hook-form';
import { beforeEach, describe, expect, it } from 'vitest';

import { ServiceInputParameters } from '../features/autentification/services/inputService';
import { IRegistrationData } from '../types/types';

describe('ServiceInputParameters', () => {
  let service: ServiceInputParameters;

  beforeEach(() => {
    const callBack = (): void => {};
    const register = {
      onChange: callBack,
      onBlur: callBack,
      name: 'password',
      ref: callBack,
    } as unknown as UseFormRegister<IRegistrationData>;
    service = new ServiceInputParameters(register);
  });

  it('should return an object with property label as object with property password', () => {
    expect(service.labels.password).toBe('Password:');
  });

  it('should return an object with property label as object with property email', () => {
    expect(service.labels.email).toBe('Email:');
  });
});
