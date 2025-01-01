import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {upperCase} from './upperCase';

describe('upperCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, upperCase())).toBe(expected.upperCase);
  });
});
