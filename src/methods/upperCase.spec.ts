import scenarios from '../scenarios';
import {upperCase, upperCaseV3} from './upperCase';

describe('upperCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'QUICKBROWNFOXFROMTOWN'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'QUICKBROWNFOXFROMTOWN'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'QUICK-BROWN-FOX-FROM-TOWN'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'QUICK.BROWN.FOX.FROM.TOWN'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(upperCase(input)).toBe(output);
  });
});

describe('upperCaseV3()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(upperCaseV3(source)).toBe(expected.upperCase);
  });
});
