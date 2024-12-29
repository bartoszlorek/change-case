import {stringSearch} from './search';

describe('stringSearch()', () => {
  const source = `She saw Sharif's shoes on the sofa. But was she so sure those were Sharif's shoes she saw?`;

  it.each([
    {
      target: '',
      fromIndex: 0,
      results: [],
    },
    {
      target: `sharif`,
      fromIndex: 0,
      results: [
        {
          match: 'Sharif',
          startIndex: 8,
          endIndex: 14,
        },
        {
          match: 'Sharif',
          startIndex: 67,
          endIndex: 73,
        },
      ],
    },
    {
      target: `sharif`,
      fromIndex: 10,
      results: [
        {
          match: 'Sharif',
          startIndex: 67,
          endIndex: 73,
        },
      ],
    },
    {
      target: `sharif's shoes on`,
      fromIndex: 0,
      results: [
        {
          match: "Sharif's shoes on",
          startIndex: 8,
          endIndex: 25,
        },
      ],
    },
    {
      target: `sharif_s_shoes_on`,
      fromIndex: 0,
      results: [
        {
          match: "Sharif's shoes on",
          startIndex: 8,
          endIndex: 25,
        },
      ],
    },
  ])('returns results of "$target" starting from $fromIndex index', ({target, fromIndex, results}) => {
    expect(stringSearch(source, target, fromIndex)).toEqual(results);
  });
});
