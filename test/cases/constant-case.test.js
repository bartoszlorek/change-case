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
  let sentence = constantCase('fox jumps over the lazy dog');
  expect(sentence).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');

  it('constantCase -> upperCase', () => {
    expect(upperCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });
  it('constantCase -> lowerCase', () => {
    expect(lowerCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('constantCase -> titleCase', () => {
    expect(titleCase(sentence)).toEqual('Fox_Jumps_Over_The_Lazy_Dog');
  });
  it('constantCase -> sentenceCase', () => {
    expect(sentenceCase(sentence)).toEqual('Fox_jumps_over_the_lazy_dog');
  });

  it('constantCase -> camelCase', () => {
    expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog');
  });
  it('constantCase -> pascalCase', () => {
    expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog');
  });
  it('constantCase -> constantCase', () => {
    expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });

  it('constantCase -> paramCase', () => {
    expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('constantCase -> snakeCase', () => {
    expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('constantCase -> dotCase', () => {
    expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog');
  });

  it('constantCase -> toggleCase', () => {
    expect(toggleCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('constantCase -> noAccents', () => {
    expect(noAccents(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });
  it('constantCase -> noCase', () => {
    expect(noCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
});
