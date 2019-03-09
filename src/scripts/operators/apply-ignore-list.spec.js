import applyIgnoreList from './apply-ignore-list';
import createState from './.internal/create-state';
import CASE_METHODS from '../cases/index';

const {upperCase} = CASE_METHODS;

describe('applyIgnoreList()', () => {
  it.each`
    data               | source                       | result
    ${null}            | ${'lazy brown fox'}          | ${'LAZY BROWN FOX'}
    ${'Brown'}         | ${'lazy brown fox'}          | ${'LAZY brown FOX'}
    ${['Fox', 'LAZY']} | ${'Lazy fox eats lazy dog.'} | ${'Lazy fox EATS lazy DOG.'}
    ${['I', 'John']}   | ${'i am john in home.'}      | ${'i AM john IN HOME.'}
  `('$data —— $source —— $result', ({data, source, result}) => {
    const state = createState(upperCase)(source);

    // apply the method manually
    state.result = upperCase(state.source);

    expect(applyIgnoreList(data)(state)).toEqual({
      method: upperCase,
      source,
      result
    });
  });
});
