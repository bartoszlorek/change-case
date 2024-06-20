import scenarios from '../scenarios';
import {toggleCase, toggleCaseV3} from './toggleCase';

describe('toggleCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick brown fox from town'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'qUICK bROWN fOX FROM tOWN'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'qUICK BROWN FOX FROM TOWN'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'QUICKbROWNfOXfROMtOWN'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'qUICKbROWNfOXfROMtOWN'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'QUICK-BROWN-FOX-FROM-TOWN'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'QUICK.BROWN.FOX.FROM.TOWN'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'quick brown fox from town'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'QUICK BROWN FOX FROM TOWN'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(toggleCase(input)).toBe(output);
  });

  it.each`
    input                | output
    ${'quick brown fox'} | ${'QUICK BROWN FOX'}
    ${'quick BROWN fox'} | ${'QUICK brown FOX'}
  `('usage: $input —— $output', ({input, output}) => {
    expect(toggleCase(input)).toBe(output);
  });
});

describe('toggleCaseV3()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(toggleCaseV3(source)).toBe(expected.toggleCase);
  });
});
