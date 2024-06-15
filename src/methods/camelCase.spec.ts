import {camelCase} from './camelCase';

describe('camelCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'quickBrownFoxFromTown'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'quickBrownFoxFromTown'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'quickBrownFoxFromTown'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'quickBrownFoxFromTown'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'quickBrownFoxFromTown'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'quickBrownFoxFromTown'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'quickBrownFoxFromTown'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'quickBrownFoxFromTown'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'quickBrownFoxFromTown'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'quickBrownFoxFromTown'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'quickBrownFoxFromTown'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'quickBrownFoxFromTown'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'quickBrownFoxFromTown'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(camelCase(input)).toBe(output);
  });
});
