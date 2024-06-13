import {titleCase} from './titleCase';

describe('titleCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'Quick Brown Fox from Town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'Quick Brown Fox from Town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'Quick Brown Fox from Town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'Quick Brown Fox from Town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'Quick Brown Fox from Town'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'Quick Brown Fox from Town'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'Quick_Brown_Fox_From_Town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'Quick-Brown-Fox-From-Town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'Quick_Brown_Fox_From_Town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'Quick.Brown.Fox.From.Town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'Quick Brown Fox from Town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'Quick Brown Fox from Town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'Quick Brown Fox from Town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(titleCase(input)).toBe(output);
  });

  describe('assertions:', () => {
    it('should handle multiple sentences', () => {
      expect(titleCase('over the lazy dog. fox jumps away.')).toBe(
        'Over the Lazy Dog. Fox Jumps Away.'
      );
    });

    it('should handle sentence with hyphens', () => {
      expect(titleCase('this extension is up-to-date right now.')).toBe(
        'This Extension Is Up-To-Date Right Now.'
      );
    });

    it('should handle sentence with lowercases', () => {
      expect(titleCase('this extension is up_to_date right now.')).toBe(
        'This Extension Is Up_To_Date Right Now.'
      );
    });

    it('should handle sentence with dotted words', () => {
      expect(titleCase('this extension is up.to.date right now.')).toBe(
        'This Extension Is Up.To.Date Right Now.'
      );
    });

    it('should handle sentence with colons', () => {
      expect(titleCase('extension: in chrome store')).toBe(
        'Extension: In Chrome Store'
      );
    });

    it('should handle special characters', () => {
      expect(titleCase('mam ładne śliwki!')).toBe('Mam Ładne Śliwki!');
    });

    fit('should handle colons', () => {
      expect(titleCase('mam ładne śliwki!')).toBe('Mam Ładne Śliwki!');
    });
  });
});
