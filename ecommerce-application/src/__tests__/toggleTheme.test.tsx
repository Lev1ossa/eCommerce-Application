import { describe, expect, it } from 'vitest';
import { toggleTheme } from '../App/utils/utils';

describe('Function toggleTheme works correctly', () => {
  it('should set theme', () => {
    localStorage.setItem('AAA-Ecom-theme', 'dark');
    const testDocument = document.documentElement;
    toggleTheme();
    const attribute = testDocument.getAttribute('theme');
    expect(attribute).toEqual('light');
  });
});
