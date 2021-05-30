// @flow strict

import {isUpperCase} from './isUpperCase';

describe('isUpperCase()', () => {
  it('returns true when char is uppercase', () => {
    expect(isUpperCase('G')).toBe(true);
  });

  it('returns false when char is lowercase', () => {
    expect(isUpperCase('g')).toBe(false);
  });
});
