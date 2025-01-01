import {tokenizer} from './tokenizer';
import {searchTokens} from './search';

describe('searchTokens()', () => {
  const source = tokenizer(
    `She saw Sharif's shoes on the sofa. But was she so sure those were Sharif's shoes she saw?`
  );

  it.each([
    {
      input: '',
      results: [],
    },
    {
      input: `sharif`,
      results: [
        {
          index: 8,
          tokens: [{index: 8, value: 'Sharif', extra: "'"}],
        },
        {
          index: 67,
          tokens: [{index: 67, value: 'Sharif', extra: "'"}],
        },
      ],
    },
    {
      input: `sharif's shoes on`,
      results: [
        {
          index: 8,
          tokens: [
            {index: 8, value: 'Sharif', extra: "'"},
            {index: 15, value: 's', extra: ' '},
            {index: 17, value: 'shoes', extra: ' '},
            {index: 23, value: 'on', extra: ' '},
          ],
        },
      ],
    },
    {
      input: `sharif_s_shoes_on`,
      results: [
        {
          index: 8,
          tokens: [
            {index: 8, value: 'Sharif', extra: "'"},
            {index: 15, value: 's', extra: ' '},
            {index: 17, value: 'shoes', extra: ' '},
            {index: 23, value: 'on', extra: ' '},
          ],
        },
      ],
    },
  ])('returns results of "$input" search', ({input, results}) => {
    expect(searchTokens(source, tokenizer(input))).toEqual(results);
  });
});
