import { describe, expect, it } from 'vitest';
import { changeDateView } from '../features/autentification/utils/utils';

describe('Function changeDateView works correctly', () => {
  it('should return empty string if argument is undefined', () => {
    expect(changeDateView(undefined)).toEqual('');
  });

  it('should return date in "day-month-year" format if argument is in "year-month-day" format', () => {
    expect(changeDateView('2022-01-15')).toEqual('15-01-2022');
  });

  it('should return the same string if argument is not in "year-month-day" format', () => {
    expect(changeDateView('15 января 2022 г.')).toEqual('15 января 2022 г.');
  });
});
