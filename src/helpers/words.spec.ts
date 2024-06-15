import {findAllWords} from './words';

describe('findAllWords()', () => {
  it('returns empty array', () => {
    const source = 'hello world';

    expect(findAllWords(source, [''])).toEqual([]);
    expect(findAllWords(source, ['not'])).toEqual([]);
  });

  it('matches only words', () => {
    const source = 'this is an example of what i am doing';

    expect(findAllWords(source, ['I'])).toEqual([
      {
        match: 'i',
        value: 'I',
        index: 27,
      },
    ]);
  });

  it('matches phrases', () => {
    const source = 'this is an example of what i am doing';

    expect(findAllWords(source, ['I am'])).toEqual([
      {
        match: 'i am',
        value: 'I am',
        index: 27,
      },
    ]);
  });

  it('matches all occurrences by string', () => {
    const source = 'hello world and    WORLD';

    expect(findAllWords(source, ['world'])).toEqual([
      {
        match: 'world',
        value: 'world',
        index: 6,
      },
      {
        match: 'WORLD',
        value: 'world',
        index: 19,
      },
    ]);
  });

  it('matches all occurrences by array', () => {
    const source = 'The lazy brown fox jumps over the LAZY dog';

    expect(findAllWords(source, ['lazy', 'FOX'])).toEqual([
      {
        match: 'lazy',
        value: 'lazy',
        index: 4,
      },
      {
        match: 'fox',
        value: 'FOX',
        index: 15,
      },
      {
        match: 'LAZY',
        value: 'lazy',
        index: 34,
      },
    ]);
  });

  it.each`
    source                     | match   | value   | index
    ${'hello ,,,,My    world'} | ${'My'} | ${'my'} | ${10}
    ${'hello "My" world'}      | ${'My'} | ${'my'} | ${7}
    ${'hello «My» world'}      | ${'My'} | ${'my'} | ${7}
    ${'hello -My-world'}       | ${'My'} | ${'my'} | ${7}
    ${'Hello „My World”'}      | ${'My'} | ${'my'} | ${7}
    ${'Hello__My world”'}      | ${'My'} | ${'my'} | ${7}
  `('matches /$match/ in /$source/', ({source, match, value, index}) =>
    expect(findAllWords(source, [value])).toEqual([{match, value, index}])
  );
});
