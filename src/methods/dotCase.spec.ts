import scenarios from '../scenarios';
import {dotCase, dotCaseV3} from './dotCase';

describe('dotCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick.brown.fox.from.town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'quick.brown.fox.from.town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'quick.brown.fox.from.town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'quick.brown.fox.from.town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'quick.brown.fox.from.town'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'quick.brown.fox.from.town'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'quick.brown.fox.from.town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'quick.brown.fox.from.town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'quick.brown.fox.from.town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'quick.brown.fox.from.town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick.brown.fox.from.town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'quick.brown.fox.from.town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'quick.brown.fox.from.town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(dotCase(input)).toBe(output);
  });
});

describe('dotCaseV3()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(dotCaseV3(source)).toBe(expected.dotCase);
  });
});
