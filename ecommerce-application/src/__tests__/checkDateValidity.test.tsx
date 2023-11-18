import { describe, expect, test } from 'vitest';

import { checkDateValidity } from '../features/autentification/utils/utils';

describe('Function checkDateValidity works correctly', () => {
  test('expect correct returned value from checkDateValidity', () => {
    expect(checkDateValidity('2023-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2022-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2021-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2012-08-01')).toBe('Sorry, you are under 13');
    expect(checkDateValidity('2006-08-01')).toBe(true);
    expect(checkDateValidity('2010-08-01')).toBe(true);
    expect(checkDateValidity('2031-08-01')).toBe(
      "You can't be born in the future",
    );
    expect(checkDateValidity(new Date().toString())).toBe(
      'Sorry, you are under 13',
    );
  });
});
