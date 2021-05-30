// @flow strict

import {isProperName} from './isProperName';

describe('isProperName()', () => {
  it('returns true when value begins with small followed by capital letters', () => {
    expect(isProperName('iPhone')).toBe(true);
    expect(isProperName('eBay')).toBe(true);
  });

  it('returns true when value has multiple capital letters', () => {
    expect(isProperName('MTV')).toBe(true);
    expect(isProperName('MasterCard')).toBe(true);
    expect(isProperName('McDonald')).toBe(true);
  });

  it('returns false when value has only one capital letter', () => {
    expect(isProperName('Frank')).toBe(false);
    expect(isProperName('Bigger')).toBe(false);
  });

  it('returns false when value does not have capital letters', () => {
    expect(isProperName('ketchup')).toBe(false);
    expect(isProperName('airplane')).toBe(false);
  });
});
