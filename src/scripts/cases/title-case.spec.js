import cases from './index';
const {titleCase} = cases;

describe('titleCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'Quick Brown Fox from Town'}
    ${'lowerCase'}    | ${'Quick Brown Fox from Town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'}
    ${'sentenceCase'} | ${'Quick Brown Fox from Town'}
    ${'camelCase'}    | ${'Quick Brown Fox from Town'}
    ${'pascalCase'}   | ${'Quick Brown Fox from Town'}
    ${'constantCase'} | ${'Quick_Brown_Fox_From_Town'}
    ${'paramCase'}    | ${'Quick-Brown-Fox-From-Town'}
    ${'snakeCase'}    | ${'Quick_Brown_Fox_From_Town'}
    ${'dotCase'}      | ${'Quick.Brown.Fox.From.Town'}
    ${'toggleCase'}   | ${'Quick Brown Fox from Town'}
    ${'noAccents'}    | ${'Quick Brown Fox from Town'}
    ${'noCase'}       | ${'Quick Brown Fox from Town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(titleCase(input)).toBe(output);
  });

  describe('assertions:', () => {
    it('should handle multiple sentences', () => {
      const result = titleCase('over the lazy dog. fox jumps away.');
      expect(result).toBe('Over the Lazy Dog. Fox Jumps Away.');
    });

    it('should handle sentence with hyphens', () => {
      const result = titleCase('this extension is up-to-date right now.');
      expect(result).toBe('This Extension Is Up-To-Date Right Now.');
    });

    it('should handle sentence with lowercases', () => {
      const result = titleCase('this extension is up_to_date right now.');
      expect(result).toBe('This Extension Is Up_To_Date Right Now.');
    });

    it('should handle sentence with dotted words', () => {
      const result = titleCase('this extension is up.to.date right now.');
      expect(result).toBe('This Extension Is Up.To.Date Right Now.');
    });

    it('should handle sentence with colons', () => {
      const result = titleCase('extension: in chrome store');
      expect(result).toBe('Extension: In Chrome Store');
    });

    it('should handle special characters', () => {
      const result = titleCase('mam ładne śliwki!');
      expect(result).toBe('Mam Ładne Śliwki!');
    });

    it('should handle colons', () => {
      const result = titleCase('mam ładne śliwki!');
      expect(result).toBe('Mam Ładne Śliwki!');
    });

    it('should handle double quotes', () => {
      const result = titleCase('this extension is up to date "right now"');
      expect(result).toBe('This Extension Is up To Date "Right Now"');
    });
	
	it('should handle single quotes but NOT apostrophes', () => {
      const result = titleCase("this extension is up to date 'right now'");
      expect(result).toBe("This Extension's up To Date 'Right Now'");
    });
  });
});
