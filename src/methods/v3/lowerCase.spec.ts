import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {lowerCase} from './lowerCase';

describe('lowerCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, lowerCase())).toBe(expected.lowerCase);
  });
});
