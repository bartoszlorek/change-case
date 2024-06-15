import {constantCase} from './constantCase';

describe('constantCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(constantCase(input)).toBe(output);
  });
});
