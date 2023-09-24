import { describe, expect, it } from 'vitest';
import { setTheme } from '../App/utils/utils';

describe('Function setTheme works correctly', () => {
  it('should set theme', () => {
    localStorage.setItem('AAA-Ecom-theme', 'dark');
    const testDocument = document.documentElement;
    setTheme();
    const attribute = testDocument.getAttribute('theme');
    expect(attribute).toEqual('dark');
  });
});
