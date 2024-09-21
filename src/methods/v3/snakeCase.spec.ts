import scenarios from '../../scenarios';
import {snakeCase} from './snakeCase';

describe('snakeCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(snakeCase(source)).toBe(expected.snakeCase);
  });
});
