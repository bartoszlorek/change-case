import cases from './index';

describe('noAccents()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'lowerCase'}    | ${'quick brown fox from town'}
    ${'titleCase'}    | ${'Quick Brown Fox from Town'}
    ${'sentenceCase'} | ${'Quick brown fox from town'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noAccents'}    | ${'quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.noAccents(input)).toBe(output);
  });
});
