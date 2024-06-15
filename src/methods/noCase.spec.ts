import {noCase} from './noCase';

describe('noCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick brown fox from town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'quick brown fox from town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'quick brown fox from town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'quick brown fox from town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'quick brown fox from town'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'quick brown fox from town'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'quick brown fox from town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'quick brown fox from town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'quick brown fox from town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'quick brown fox from town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick brown fox from town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'quick brown fox from town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(noCase(input)).toBe(output);
  });

  it('removes non-word characters', () => {
    expect(noCase('The quick brown fox, which jumps over...')).toBe(
      'the quick brown fox which jumps over'
    );
  });
});
