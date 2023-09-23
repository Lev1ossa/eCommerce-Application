import { describe, expect, it } from 'vitest';
import { getTheme } from '../App/utils/utils';

describe('Function getTheme works correctly', () => {
  it('should return the refresh theme', () => {
    localStorage.setItem('AAA-Ecom-theme', 'dark');
    const result = getTheme();
    expect(result).toEqual('dark');
  });

  it('should return the light theme if the theme does not exist in local storage', () => {
    localStorage.removeItem('AAA-Ecom-theme');
    const result = getTheme();
    expect(result).toEqual('light');
  });
});
