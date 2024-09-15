import {insensitiveStringSearch} from './string';

describe('insensitiveStringSearch()', () => {
  it.each([
    {
      source: '',
      target: '',
      expected: [],
    },
    {
      source: 'hello cruel world',
      target: 'hello world',
      expected: [],
    },
    {
      source: 'mad world',
      target: 'hello world',
      expected: [],
    },
    {
      source: 'hello world',
      target: 'HELLO WORLD',
      expected: [
        {
          match: 'hello world',
          startIndex: 0,
          endIndex: 11,
        },
      ],
    },
    {
      source: 'hello_world_with_my_iphone_16',
      target: 'Hello World',
      expected: [
        {
          match: 'hello_world',
          startIndex: 0,
          endIndex: 11,
        },
      ],
    },
    {
      source: 'HELLOWORLD',
      target: 'Hello World',
      expected: [
        {
          match: 'HELLOWORLD',
          startIndex: 0,
          endIndex: 10,
        },
      ],
    },
    {
      source: 'fooHelloWorldAndMyIphone_16Case',
      target: 'iPhone 16',
      expected: [
        {
          match: 'Iphone_16',
          startIndex: 18,
          endIndex: 27,
        },
      ],
    },
    {
      source: 'iphone 16 and hello world with iphone 16',
      target: 'iPhone 16',
      expected: [
        {
          match: 'iphone 16',
          startIndex: 0,
          endIndex: 9,
        },
        {
          match: 'iphone 16',
          startIndex: 31,
          endIndex: 40,
        },
      ],
    },
  ])('matches "$target" in "$source"', ({source, target, expected}) => {
    expect(insensitiveStringSearch(source, target)).toEqual(expected);
  });
});
