import scenarios from '../../scenarios';
import {renderString} from '../../tokenizer';
import {paramCase} from './paramCase';

describe('paramCase()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(renderString(source, paramCase())).toBe(expected.paramCase);
  });
});
