// @flow strict

import {snakeCase} from './snakeCase';

describe('snakeCase()', () => {
  it('lowercases all unassigned chars', () => {
    expect(snakeCase('I have two dogs and some rabbits')).toBe(
      'i_have_two_dogs_and_some_rabbits',
    );
  });

  it('removes non-latin chars', () => {
    expect(snakeCase("Well! That's expensive.")).toBe('well_that_s_expensive');
  });

  it('replaces decimal comma or dot with underscore', () => {
    expect(snakeCase('To be exactly 10,000,120.62 km')).toBe(
      'to_be_exactly_10_000_120_62_km',
    );
  });
});
