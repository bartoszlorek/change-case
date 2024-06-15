import {sentenceCase} from './sentenceCase';

describe('sentenceCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'Quick brown fox from town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'Quick brown fox from town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'Quick brown fox from town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'Quick brown fox from town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'Quick brown fox from town'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'Quick brown fox from town'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'Quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'Quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'Quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'Quick.brown.Fox.from.Town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'Quick brown fox from town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'Quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'Quick brown fox from town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(sentenceCase(input)).toBe(output);
  });

  it('handles single sentence', () => {
    expect(sentenceCase('fox jumps over the lazy dog.')).toBe(
      'Fox jumps over the lazy dog.'
    );
  });

  it('handles one and a half of sentence', () => {
    expect(sentenceCase('yes, i said. it is pretty to')).toBe(
      'Yes, i said. It is pretty to'
    );
  });

  it('handles sentence without delimiters', () => {
    expect(sentenceCase('fox jumps over the lazy dog')).toBe(
      'Fox jumps over the lazy dog'
    );
  });

  it('handles multiple sentences', () => {
    expect(sentenceCase('WHERE ARE MY KEYS? OH! THEY ARE... HERE.')).toBe(
      'Where are my keys? Oh! They are... here.'
    );
  });

  it('handles short abbreviations', () => {
    expect(sentenceCase('YOU ARE E.G. THERE.  ARE WE ALT. HERE?')).toBe(
      'You are e.g. there.  Are we alt. here?'
    );
  });

  it('handles long abbreviations', () => {
    expect(sentenceCase('HELLO MR. AND SGT. DOGGY!')).toBe(
      'Hello mr. and sgt. doggy!'
    );
  });

  it('handles capital letter abbreviations', () => {
    expect(sentenceCase('hello Mr. and Sgt. Doggy!')).toBe(
      'Hello mr. and sgt. doggy!'
    );
  });
});
