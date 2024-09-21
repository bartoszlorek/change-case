import scenarios from '../../scenarios';
import {dotCase} from './dotCase';

describe('dotCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(dotCase(source)).toBe(expected.dotCase);
  });
});
