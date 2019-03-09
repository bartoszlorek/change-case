import cases from '../../src/scripts/cases/index';
const {
  upperCase,
  lowerCase,
  titleCase,
  sentenceCase,

  camelCase,
  pascalCase,
  constantCase,

  paramCase,
  snakeCase,
  dotCase,

  toggleCase,
  noAccents,
  noCase
} = cases;

describe('conversion', () => {
  let sentence = upperCase('fox jumps over the lazy dog');
  expect(sentence).toEqual('FOX JUMPS OVER THE LAZY DOG');

  it('upperCase -> upperCase', () => {
    expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG');
  });
  it('upperCase -> lowerCase', () => {
    expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
  it('upperCase -> titleCase', () => {
    expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog');
  });
  it('upperCase -> sentenceCase', () => {
    expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog');
  });

  it('upperCase -> camelCase', () => {
    expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog');
  });
  it('upperCase -> pascalCase', () => {
    expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog');
  });
  it('upperCase -> constantCase', () => {
    expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });

  it('upperCase -> paramCase', () => {
    expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('upperCase -> snakeCase', () => {
    expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('upperCase -> dotCase', () => {
    expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog');
  });

  it('upperCase -> toggleCase', () => {
    expect(toggleCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
  it('upperCase -> noAccents', () => {
    expect(noAccents(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG');
  });
  it('upperCase -> noCase', () => {
    expect(noCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
});
