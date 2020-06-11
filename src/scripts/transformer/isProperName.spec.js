// @flow strict

import {isProperName} from './isProperName';

describe('isProperName()', () => {
  it.each`
    value           | expected
    ${'iPhone'}     | ${true}
    ${'McDonald'}   | ${true}
    ${'eBay'}       | ${true}
    ${'MasterCard'} | ${true}
    ${'FedEx'}      | ${true}
    ${'PayPal'}     | ${true}
    ${'MTV'}        | ${true}
    ${'KFC'}        | ${true}
    ${'dog'}        | ${false}
    ${'Frank'}      | ${false}
    ${'ketchup'}    | ${false}
    ${'Bigger'}     | ${false}
    ${'airplane'}   | ${false}
  `('test $value to be $expected', ({value, expected}) => {
    expect(isProperName(value)).toBe(expected);
  });
});
