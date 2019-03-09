import findAll from '../../src/.utils/find-all';

const source = 'The lazy brown fox jumps over the LAZY dog.';

describe('find-all.js', () => {
  it('should return empty array', () => {
    expect(findAll(source, null)).toEqual([]);
    expect(findAll(source, 'not')).toEqual([]);
    expect(findAll(source, [])).toEqual([]);
  });

  it('should match case sensitive by default', () => {
    expect(findAll(source, 'lazy')).toEqual([
      {
        match: 'lazy',
        value: 'lazy',
        index: 4
      }
    ]);
  });

  it('should match all occurrences (CI)', () => {
    expect(findAll(source, 'lazy', true)).toEqual([
      {
        match: 'lazy',
        value: 'lazy',
        index: 4
      },
      {
        match: 'LAZY',
        value: 'lazy',
        index: 34
      }
    ]);
  });

  it('should match all occurrences by array', () => {
    expect(findAll(source, ['lazy', 'FOX'], true)).toEqual([
      {
        match: 'lazy',
        value: 'lazy',
        index: 4
      },
      {
        match: 'fox',
        value: 'FOX',
        index: 15
      },
      {
        match: 'LAZY',
        value: 'lazy',
        index: 34
      }
    ]);
  });
});
