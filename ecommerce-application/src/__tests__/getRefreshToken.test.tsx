import { describe, expect, it } from 'vitest';
import { getRefreshToken } from '../api/utils';

describe('Function getRefreshToken works correctly', () => {
  it('should return the refresh token from local storage', () => {
    const userLogin = {
      token: '111111',
      isLogin: false,
    };
    localStorage.setItem(
      'AAA-Ecom-refreshTokenData',
      JSON.stringify(userLogin),
    );
    const result = getRefreshToken();
    expect(result).toEqual('111111');
  });

  it('should return an empty string if the refresh token does not exist in local storage', () => {
    localStorage.removeItem('AAA-Ecom-refreshTokenData');
    const result = getRefreshToken();
    expect(result).toEqual('');
  });
});
