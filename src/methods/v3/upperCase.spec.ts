import scenarios from '../../scenarios';
import {upperCase} from './upperCase';

describe('upperCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(upperCase(source)).toBe(expected.upperCase);
  });
});
