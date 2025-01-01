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
        {index: 0, value: 'Paul', extra: ' '},
        {index: 5, value: 'Mc', extra: ''},
        {index: 7, value: 'Cartney', extra: ' '},
        {index: 15, value: 'and', extra: ' '},
        {index: 19, value: 'John', extra: ' '},
        {index: 24, value: 'Lennon', extra: ''},
      ],
    },
    {
      source: 'helloMyKitty',
      tokens: [
        {index: 0, value: 'hello', extra: ''},
        {index: 5, value: 'My', extra: ''},
        {index: 7, value: 'Kitty', extra: ''},
      ],
    },
    {
      source: 'Apple iPhone 17',
      tokens: [
        {index: 0, value: 'Apple', extra: ' '},
        {index: 6, value: 'iPhone', extra: ' '},
        {index: 13, value: '17', extra: ''},
      ],
    },
  ])('returns tokens on case change from "$source"', ({source, tokens}) => {
    expect(tokenizer(source)).toEqual(tokens);
  });
});
