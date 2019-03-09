import applyIgnoreList from '../../src/scripts/operators/apply-ignore-list';
import createState from '../../src/scripts/operators/.internal/create-state';
import CASE_METHODS from '../../src/scripts/cases/index';

const { upperCase } = CASE_METHODS;

describe('apply-ignore-list.js', () => {
  it('should return unchanged string (no additional data)', () => {
    const state = createState(upperCase)('lazy brown fox');
    const data = null;

    applyIgnoreList(data)(state);
    expect(state).toEqual({
      method: upperCase,
      source: 'lazy brown fox',
      result: 'lazy brown fox'
    });
  });

  it('should ignore words from array', () => {
    const source = 'The lazy brown fox jumps over the lazy dog.';
    const result = 'THE lazy brown fox JUMPS OVER THE lazy DOG.';
    const state = createState(upperCase)(source);
    const data = ['Brown Fox', 'LAZY'];

    // manually apply method
    state.result = upperCase(state.source);

    applyIgnoreList(data)(state);
    expect(state).toEqual({
      method: upperCase,
      source,
      result
    });
  });

  it('should ignore only specific words', () => {
    const source = 'i am john in home.';
    const result = 'i AM john IN HOME.';
    const state = createState(upperCase)(source);
    const data = ['I', 'John'];

    // manually apply method
    state.result = upperCase(state.source);

    applyIgnoreList(data)(state);
    expect(state).toEqual({
      method: upperCase,
      source,
      result
    });
  });
});
