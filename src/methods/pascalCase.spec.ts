import scenarios from '../scenarios';
import {pascalCase, pascalCaseV3} from './pascalCase';

describe('pascalCase()', () => {
  it.each`
    method            | input                          | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'} | ${'QuickBrownFoxFromTown'}
    ${'lowerCase'}    | ${'quick brown fox from town'} | ${'QuickBrownFoxFromTown'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'} | ${'QuickBrownFoxFromTown'}
    ${'sentenceCase'} | ${'Quick brown fox from town'} | ${'QuickBrownFoxFromTown'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}     | ${'QuickBrownFoxFromTown'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}     | ${'QuickBrownFoxFromTown'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'} | ${'QuickBrownFoxFromTown'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'} | ${'QuickBrownFoxFromTown'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'} | ${'QuickBrownFoxFromTown'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'} | ${'QuickBrownFoxFromTown'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'} | ${'QuickBrownFoxFromTown'}
    ${'noAccents'}    | ${'quick brown fox from town'} | ${'QuickBrownFoxFromTown'}
    ${'noCase'}       | ${'quick brown fox from town'} | ${'QuickBrownFoxFromTown'}
  `('converts from $method —— $output', ({input, output}) => {
    expect(pascalCase(input)).toBe(output);
  });
});

describe('pascalCaseV3()', () => {
  it.each(scenarios)('$scenario \t $source', ({source, expected}) => {
    expect(pascalCaseV3(source)).toBe(expected.pascalCase);
  });
});
