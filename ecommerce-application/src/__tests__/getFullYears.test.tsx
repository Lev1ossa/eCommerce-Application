import { describe, expect, test } from 'vitest';

import { getFullYears } from '../utils/utils';

describe('Function getFullYears works correctly', () => {
  test('expect years count', () => {
    expect(getFullYears('2023-08-01')).toBe(0);
    expect(getFullYears('2022-08-01')).toBe(1);
    expect(getFullYears('2021-08-01')).toBe(2);
    expect(getFullYears('2012-08-01')).toBe(11);
    expect(getFullYears('2015-08-01')).toBe(8);
    expect(getFullYears('2035-08-01')).toBe(-12);
    expect(getFullYears(new Date().toString())).toBe(0);
  });
});
