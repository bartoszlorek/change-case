import scenarios from '../../scenarios';
import {lowerCase} from './lowerCase';

describe('lowerCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(lowerCase(source)).toBe(expected.lowerCase);
  });
});
