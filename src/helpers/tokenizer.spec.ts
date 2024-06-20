import scenarios from '../scenarios';
import {tokenizer} from './tokenizer';

describe('tokenizer()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, tokens}) => {
    expect(tokenizer(source)).toEqual(tokens);
  });
});
