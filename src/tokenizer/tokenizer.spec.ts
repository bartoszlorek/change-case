import scenarios from '../scenarios';
import {tokenizer} from './tokenizer';

describe('tokenizer()', () => {
  describe('scenarios', () => {
    it.each(scenarios)('$scenario \t $source', ({source, tokens}) => {
      expect(tokenizer(source)).toEqual(tokens);
    });
  });

  it.each([
    {
      source: 'Paul McCartney and John Lennon',
      tokens: [
        {index: 0, value: 'Paul', break: ' '},
        {index: 5, value: 'Mc', break: ''},
        {index: 7, value: 'Cartney', break: ' '},
        {index: 15, value: 'and', break: ' '},
        {index: 19, value: 'John', break: ' '},
        {index: 24, value: 'Lennon', break: ''},
      ],
    },
    {
      source: 'helloMyKitty',
      tokens: [
        {index: 0, value: 'hello', break: ''},
        {index: 5, value: 'My', break: ''},
        {index: 7, value: 'Kitty', break: ''},
      ],
    },
    {
      source: 'Apple iPhone 17',
      tokens: [
        {index: 0, value: 'Apple', break: ' '},
        {index: 6, value: 'iPhone', break: ' '},
        {index: 13, value: '17', break: ''},
      ],
    },
  ])('returns tokens on case change from "$source"', ({source, tokens}) => {
    expect(tokenizer(source)).toEqual(tokens);
  });
});
