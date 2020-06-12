// @flow strict

import {constantCase} from './constantCase';

describe('constantCase()', () => {
  it('uppercases all unassigned chars', () => {
    expect(constantCase('He lives in my house')).toBe('HE_LIVES_IN_MY_HOUSE');
  });

  it('removes non-latin chars', () => {
    expect(constantCase("Well! That's expensive.")).toBe(
      'WELL_THAT_S_EXPENSIVE',
    );
  });

  it('replaces decimal comma or dot with underscore', () => {
    expect(constantCase('To be exactly 10,000,120.62 km')).toBe(
      'TO_BE_EXACTLY_10_000_120_62_KM',
    );
  });
});
