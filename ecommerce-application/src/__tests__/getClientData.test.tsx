import { describe, expect, it } from 'vitest';
import { getClientData } from '../api/utils';

describe('Function getClientData works correctly', () => {
  it('should return the expected data', () => {
    const registrationData = {
      shippingCountry: 'Belarus',
      shippingCity: 'Sloboda',
      shippingStreet: 'Masherova',
      shippingPostalCode: '111111',
      billingCountry: 'Belarus',
      billingCity: 'Minsk',
      billingStreet: 'Masherova',
      billingPostalCode: '222222',
      isSameAddress: false,
      isShippingAddressDefault: true,
      isBillingAddressDefault: false,
      isShipping: false,
      isBilling: true,
      newPassword: '222222qQ',
      currentPassword: '111111qQ',
      birthDate: '01/01/2000',
      email: 'test@test.com',
      password: '111111qQ',
      userFirstName: 'A',
      userLastName: 'A',
    };

    const expectedCustomerDraft = {
      email: 'test@test.com',
      password: '111111qQ',
      firstName: 'A',
      lastName: 'A',
      dateOfBirth: '2000-01-01',
      addresses: [
        {
          country: 'Belarus',
          city: 'Sloboda',
          streetName: 'Masherova',
          postalCode: '111111',
        },
        {
          country: 'Belarus',
          city: 'Minsk',
          streetName: 'Masherova',
          postalCode: '222222',
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress: 0,
      defaultBillingAddress: undefined,
    };

    const result = getClientData(registrationData);

    expect(result).toEqual(expectedCustomerDraft);
  });
});
