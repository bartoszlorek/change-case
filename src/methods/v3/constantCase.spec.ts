import scenarios from '../../scenarios';
import {constantCase} from './constantCase';

describe('constantCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(constantCase(source)).toBe(expected.constantCase);
  });
});
