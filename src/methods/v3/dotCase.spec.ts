import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {dotCase} from './dotCase';

describe('dotCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, dotCase())).toBe(expected.dotCase);
  });
});
