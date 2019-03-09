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

describe('usage', () => {
  it('should handle single sentence', () => {
    const result = sentenceCase('fox jumps over the lazy dog.');
    expect(result).toEqual('Fox jumps over the lazy dog.');
  });

  it('should handle one and a half of sentence', () => {
    const result = sentenceCase('yes, i said. it is pretty to');
    expect(result).toEqual('Yes, i said. It is pretty to');
  });

  it('should handle sentence without delimiters', () => {
    const result = sentenceCase('fox jumps over the lazy dog');
    expect(result).toEqual('Fox jumps over the lazy dog');
  });

  it('should handle multiple sentences', () => {
    const result = sentenceCase('WHERE ARE MY KEYS? OH! THEY ARE... HERE.');
    expect(result).toEqual('Where are my keys? Oh! They are... here.');
  });

  it('should handle short abbreviations', () => {
    const result = sentenceCase('YOU ARE E.G. THERE.  ARE WE ALT. HERE?');
    expect(result).toEqual('You are e.g. there.  Are we alt. here?');
  });

  it('should handle long abbreviations', () => {
    const result = sentenceCase('HELLO MR. AND SGT. DOGGY!');
    expect(result).toEqual('Hello mr. and sgt. doggy!');
  });

  it('should handle capital letter abbreviations', () => {
    const result = sentenceCase('hello Mr. and Sgt. Doggy!');
    expect(result).toEqual('Hello mr. and sgt. doggy!');
  });
});

describe('conversion', () => {
  let sentence = sentenceCase('fox jumps over the lazy dog');
  expect(sentence).toEqual('Fox jumps over the lazy dog');

  it('sentenceCase -> upperCase', () => {
    expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG');
  });
  it('sentenceCase -> lowerCase', () => {
    expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
  it('sentenceCase -> titleCase', () => {
    expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog');
  });
  it('sentenceCase -> sentenceCase', () => {
    expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog');
  });

  it('sentenceCase -> camelCase', () => {
    expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog');
  });
  it('sentenceCase -> pascalCase', () => {
    expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog');
  });
  it('sentenceCase -> constantCase', () => {
    expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });

  it('sentenceCase -> paramCase', () => {
    expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('sentenceCase -> snakeCase', () => {
    expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('sentenceCase -> dotCase', () => {
    expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog');
  });

  it('sentenceCase -> toggleCase', () => {
    expect(toggleCase(sentence)).toEqual('fOX JUMPS OVER THE LAZY DOG');
  });
  it('sentenceCase -> noAccents', () => {
    expect(noAccents(sentence)).toEqual('Fox jumps over the lazy dog');
  });
  it('sentenceCase -> noCase', () => {
    expect(noCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
});
