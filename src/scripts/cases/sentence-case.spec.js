import cases from './index';
const {sentenceCase} = cases;

describe('sentenceCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'Quick brown fox from town'}
    ${'lowerCase'}    | ${'Quick brown fox from town'}
    ${'titleCase'}    | ${'Quick brown fox from town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'}
    ${'camelCase'}    | ${'Quick brown fox from town'}
    ${'pascalCase'}   | ${'Quick brown fox from town'}
    ${'constantCase'} | ${'Quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'Quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'Quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'Quick.brown.Fox.from.Town'}
    ${'toggleCase'}   | ${'Quick brown fox from town'}
    ${'noAccents'}    | ${'Quick brown fox from town'}
    ${'noCase'}       | ${'Quick brown fox from town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(sentenceCase(input)).toBe(output);
  });

  describe('assertions:', () => {
    it('should handle single sentence', () => {
      const result = sentenceCase('fox jumps over the lazy dog.');
      expect(result).toBe('Fox jumps over the lazy dog.');
    });

    it('should handle one and a half of sentence', () => {
      const result = sentenceCase('yes, i said. it is pretty to');
      expect(result).toBe('Yes, i said. It is pretty to');
    });

    it('should handle sentence without delimiters', () => {
      const result = sentenceCase('fox jumps over the lazy dog');
      expect(result).toBe('Fox jumps over the lazy dog');
    });

    it('should handle multiple sentences', () => {
      const result = sentenceCase('WHERE ARE MY KEYS? OH! THEY ARE... HERE.');
      expect(result).toBe('Where are my keys? Oh! They are... here.');
    });

    it('should handle short abbreviations', () => {
      const result = sentenceCase('YOU ARE E.G. THERE.  ARE WE ALT. HERE?');
      expect(result).toBe('You are e.g. there.  Are we alt. here?');
    });

    it('should handle long abbreviations', () => {
      const result = sentenceCase('HELLO MR. AND SGT. DOGGY!');
      expect(result).toBe('Hello mr. and sgt. doggy!');
    });

    it('should handle capital letter abbreviations', () => {
      const result = sentenceCase('hello Mr. and Sgt. Doggy!');
      expect(result).toBe('Hello mr. and sgt. doggy!');
    });
  });
});
