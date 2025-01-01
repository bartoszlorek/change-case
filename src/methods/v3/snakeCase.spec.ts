import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {snakeCase} from './snakeCase';

describe('snakeCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, snakeCase())).toBe(expected.snakeCase);
  });
});
