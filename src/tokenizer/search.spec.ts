import {stringSearch} from './search';
import {caseInsensitiveTokenizer} from './tokenizer';

describe('stringSearch()', () => {
  const source = `She saw Sharif's shoes on the sofa. But was she so sure those were Sharif's shoes she saw?`;

  it.each([
    {
      patterns: [],
      results: [],
    },
    {
      patterns: [''],
      results: [],
    },
    {
      patterns: [`SHARIF`],
      results: [
        {
          pattern: 'SHARIF',
          matched: 'Sharif',
          startIndex: 8,
          endIndex: 14,
        },
        {
          pattern: 'SHARIF',
          matched: 'Sharif',
          startIndex: 67,
          endIndex: 73,
        },
      ],
    },
    {
      patterns: [`Sharif's shoes on`],
      results: [
        {
          pattern: "Sharif's shoes on",
          matched: "Sharif's shoes on",
          startIndex: 8,
          endIndex: 25,
        },
      ],
    },
    {
      patterns: [`she saw`, `Sharif's shoes`],
      results: [
        {
          pattern: 'she saw',
          matched: 'She saw',
          startIndex: 0,
          endIndex: 7,
        },
        {
          pattern: 'she saw',
          matched: 'she saw',
          startIndex: 82,
          endIndex: 89,
        },
        {
          pattern: "Sharif's shoes",
          matched: "Sharif's shoes",
          startIndex: 8,
          endIndex: 22,
        },
        {
          pattern: "Sharif's shoes",
          matched: "Sharif's shoes",
          startIndex: 67,
          endIndex: 81,
        },
      ],
    },
    {
      patterns: [`sharif_s_shoes_on`],
      results: [
        {
          pattern: 'sharif_s_shoes_on',
          matched: "Sharif's shoes on",
          startIndex: 8,
          endIndex: 25,
        },
      ],
    },
  ])('returns results of $patterns', ({patterns, results}) => {
    expect(stringSearch(source, patterns, caseInsensitiveTokenizer)).toEqual(results);
  });
});
