import {lowerCase} from './lowerCase';

describe('lowerCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick brown fox from town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'quick brown fox from town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'quick brown fox from town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'quick brown fox from town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'quickbrownfoxfromtown'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'quickbrownfoxfromtown'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'quick.brown.fox.from.town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick brown fox from town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'quick brown fox from town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(lowerCase(input)).toBe(output);
  });
});
