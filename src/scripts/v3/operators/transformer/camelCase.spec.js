// @flow strict

import {camelCase} from './camelCase';

describe('camelCase()', () => {
  it('uppercases unassigned char after whitespace', () => {
    expect(camelCase('This is my dog')).toBe('thisIsMyDog');
  });

  it('removes non-latin chars', () => {
    expect(camelCase("Well! That's expensive.")).toBe('wellThatSExpensive');
  });

  it('adds underscore before each numeric value', () => {
    expect(camelCase('The end of the 19th century')).toBe(
      'theEndOfThe_19thCentury',
    );
  });

  it('replaces decimal comma or dot with underscore', () => {
    expect(camelCase('To be exactly 10,000,120.62 km')).toBe(
      'toBeExactly_10_000_120_62Km',
    );
  });
});
