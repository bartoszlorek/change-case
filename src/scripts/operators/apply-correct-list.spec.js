import applyCorrectList from './apply-correct-list';
import createState from './.internal/create-state';

describe('applyCorrectList()', () => {
  it.each`
    data               | source                       | result
    ${null}            | ${'lazy brown fox'}          | ${'lazy brown fox'}
    ${'Brown'}         | ${'lazy brown fox'}          | ${'lazy Brown fox'}
    ${['Fox', 'LAZY']} | ${'Lazy fox eats lazy dog.'} | ${'LAZY Fox eats LAZY dog.'}
    ${['I', 'John']}   | ${'i am john in home.'}      | ${'I am John in home.'}
  `('$data —— $source —— $result', ({data, source, result}) => {
    const state = createState()(source);

    expect(applyCorrectList(data)(state)).toEqual({
      method: null,
      source,
      result
    });
  });
});
