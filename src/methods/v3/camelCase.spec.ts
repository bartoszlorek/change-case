import scenarios from '../../scenarios';
import {camelCase} from './camelCase';

describe('camelCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(camelCase(source)).toBe(expected.camelCase);
  });
});
