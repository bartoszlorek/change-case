import scenarios from '../../scenarios';
import {toggleCase} from './toggleCase';

describe('toggleCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(toggleCase(source)).toBe(expected.toggleCase);
  });
});
