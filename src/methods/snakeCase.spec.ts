import {snakeCase} from './snakeCase';

describe('snakeCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick_brown_fox_from_town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'quick_brown_fox_from_town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'quick_brown_fox_from_town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'quick_brown_fox_from_town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'quick_brown_fox_from_town'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'quick_brown_fox_from_town'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'quick_brown_fox_from_town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'quick_brown_fox_from_town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick_brown_fox_from_town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'quick_brown_fox_from_town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'quick_brown_fox_from_town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(snakeCase(input)).toBe(output);
  });
});
