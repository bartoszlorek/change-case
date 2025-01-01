import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {camelCase} from './camelCase';

describe('camelCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, camelCase())).toBe(expected.camelCase);
  });
});
