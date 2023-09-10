import { describe, expect, test } from 'vitest';
import { generateUniqueKey } from '../api/utils';

describe('Function generateUniqueKey works correctly', () => {
  test('generateUniqueKey should return a string (length 7)', () => {
    const key = generateUniqueKey();
    expect(key).toHaveLength(7);
  });

  test('generateUniqueKey should return different strings', () => {
    const key1 = generateUniqueKey();
    const key2 = generateUniqueKey();
    expect(key1).not.toBe(key2);
  });
});
