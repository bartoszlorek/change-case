import {tokenizer} from './tokenizer';
import examples from '../examples';

describe('tokenizer()', () => {
  it.each(examples)('%p', ({source, tokens}) => {
    expect(tokenizer(source)).toEqual(tokens);
  });
});
