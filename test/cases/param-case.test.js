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
  let sentence = paramCase('fox jumps over the lazy dog');
  expect(sentence).toEqual('fox-jumps-over-the-lazy-dog');

  it('paramCase -> upperCase', () => {
    expect(upperCase(sentence)).toEqual('FOX-JUMPS-OVER-THE-LAZY-DOG');
  });
  it('paramCase -> lowerCase', () => {
    expect(lowerCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('paramCase -> titleCase', () => {
    expect(titleCase(sentence)).toEqual('Fox-Jumps-Over-The-Lazy-Dog');
  });
  it('paramCase -> sentenceCase', () => {
    expect(sentenceCase(sentence)).toEqual('Fox-jumps-over-the-lazy-dog');
  });

  it('paramCase -> camelCase', () => {
    expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog');
  });
  it('paramCase -> pascalCase', () => {
    expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog');
  });
  it('paramCase -> constantCase', () => {
    expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });

  it('paramCase -> paramCase', () => {
    expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('paramCase -> snakeCase', () => {
    expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('paramCase -> dotCase', () => {
    expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog');
  });

  it('paramCase -> toggleCase', () => {
    expect(toggleCase(sentence)).toEqual('FOX-JUMPS-OVER-THE-LAZY-DOG');
  });
  it('paramCase -> noAccents', () => {
    expect(noAccents(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('paramCase -> noCase', () => {
    expect(noCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
});
