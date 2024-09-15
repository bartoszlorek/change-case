import {insensitiveStringSearch} from './string';

describe('insensitiveStringSearch()', () => {
  const patterns = ['Hello World', 'iPhone 16'];

  it.each([
    {
      source: 'hello world',
      expected: [
        {
          match: 'hello world',
          pattern: 'Hello World',
          startIndex: 0,
          endIndex: 11,
        },
      ],
    },
    {
      source: 'hello cruel world',
      expected: [],
    },
    {
      source: 'mad world',
      expected: [],
    },
    {
      source: 'hello_world_with_my_iphone_16',
      expected: [
        {
          match: 'hello_world',
          pattern: 'Hello World',
          startIndex: 0,
          endIndex: 11,
        },
        {
          match: 'iphone_16',
          pattern: 'iPhone 16',
          startIndex: 20,
          endIndex: 29,
        },
      ],
    },
    {
      source: 'HELLOWORLD',
      expected: [
        {
          match: 'HELLOWORLD',
          pattern: 'Hello World',
          startIndex: 0,
          endIndex: 10,
        },
      ],
    },
    {
      source: 'fooHelloWorldAndMyIphone_16Case',
      expected: [
        {
          match: 'HelloWorld',
          pattern: 'Hello World',
          startIndex: 3,
          endIndex: 13,
        },
        {
          match: 'Iphone_16',
          pattern: 'iPhone 16',
          startIndex: 18,
          endIndex: 27,
        },
      ],
    },
    {
      source: 'iphone 16 and hello world with iphone 16',
      expected: [
        {
          match: 'hello world',
          pattern: 'Hello World',
          startIndex: 14,
          endIndex: 25,
        },
        {
          match: 'iphone 16',
          pattern: 'iPhone 16',
          startIndex: 0,
          endIndex: 9,
        },
        {
          match: 'iphone 16',
          pattern: 'iPhone 16',
          startIndex: 31,
          endIndex: 40,
        },
      ],
    },
  ])('matches "$source"', ({source, expected}) => {
    expect(insensitiveStringSearch(source, patterns)).toEqual(expected);
  });
});
