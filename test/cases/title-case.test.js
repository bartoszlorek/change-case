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
  it('should handle multiple sentences', () => {
    const result = titleCase('over the lazy dog. fox jumps away.');
    expect(result).toEqual('Over the Lazy Dog. Fox Jumps Away.');
  });

  it('should handle sentence with hyphens', () => {
    const result = titleCase('this extension is up-to-date right now.');
    expect(result).toEqual('This Extension Is Up-To-Date Right Now.');
  });

  it('should handle sentence with lowercases', () => {
    const result = titleCase('this extension is up_to_date right now.');
    expect(result).toEqual('This Extension Is Up_To_Date Right Now.');
  });

  it('should handle sentence with dotted words', () => {
    const result = titleCase('this extension is up.to.date right now.');
    expect(result).toEqual('This Extension Is Up.To.Date Right Now.');
  });

  it('should handle sentence with colons', () => {
    const result = titleCase('extension: in chrome store');
    expect(result).toEqual('Extension: In Chrome Store');
  });

  it('should handle special characters', () => {
    const result = titleCase('mam ładne śliwki!');
    expect(result).toEqual('Mam Ładne Śliwki!');
  });

  it('should handle colons', () => {
    const result = titleCase('mam ładne śliwki!');
    expect(result).toEqual('Mam Ładne Śliwki!');
  });
});

describe('conversion', () => {
  let sentence = titleCase('fox jumps over the lazy dog');
  expect(sentence).toEqual('Fox Jumps Over the Lazy Dog');

  it('titleCase -> upperCase', () => {
    expect(upperCase(sentence)).toEqual('FOX JUMPS OVER THE LAZY DOG');
  });
  it('titleCase -> lowerCase', () => {
    expect(lowerCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
  it('titleCase -> titleCase', () => {
    expect(titleCase(sentence)).toEqual('Fox Jumps Over the Lazy Dog');
  });
  it('titleCase -> sentenceCase', () => {
    expect(sentenceCase(sentence)).toEqual('Fox jumps over the lazy dog');
  });

  it('titleCase -> camelCase', () => {
    expect(camelCase(sentence)).toEqual('foxJumpsOverTheLazyDog');
  });
  it('titleCase -> pascalCase', () => {
    expect(pascalCase(sentence)).toEqual('FoxJumpsOverTheLazyDog');
  });
  it('titleCase -> constantCase', () => {
    expect(constantCase(sentence)).toEqual('FOX_JUMPS_OVER_THE_LAZY_DOG');
  });

  it('titleCase -> paramCase', () => {
    expect(paramCase(sentence)).toEqual('fox-jumps-over-the-lazy-dog');
  });
  it('titleCase -> snakeCase', () => {
    expect(snakeCase(sentence)).toEqual('fox_jumps_over_the_lazy_dog');
  });
  it('titleCase -> dotCase', () => {
    expect(dotCase(sentence)).toEqual('fox.jumps.over.the.lazy.dog');
  });

  it('titleCase -> toggleCase', () => {
    expect(toggleCase(sentence)).toEqual('fOX jUMPS oVER THE lAZY dOG');
  });
  it('titleCase -> noAccents', () => {
    expect(noAccents(sentence)).toEqual('Fox Jumps Over the Lazy Dog');
  });
  it('titleCase -> noCase', () => {
    expect(noCase(sentence)).toEqual('fox jumps over the lazy dog');
  });
});
