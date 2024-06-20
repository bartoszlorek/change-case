import scenarios from '../scenarios';
import {noAccents, noAccentsV3} from './noAccents';

describe('noAccents()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'quick brown fox from town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'Quick Brown Fox from Town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'Quick brown fox from town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'quickBrownFoxFromTown'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'QuickBrownFoxFromTown'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'quick.brown.fox.from.town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'quick brown fox from town'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(noAccents(input)).toBe(output);
  });
});

describe('noAccentsV3()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(noAccentsV3(source)).toBe(expected.noAccents);
  });
});
