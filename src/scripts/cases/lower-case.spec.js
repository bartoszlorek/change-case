import cases from './index';

describe('lowerCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'quick brown fox from town'}
    ${'lowerCase'}    | ${'quick brown fox from town'}
    ${'titleCase'}    | ${'quick brown fox from town'}
    ${'sentenceCase'} | ${'quick brown fox from town'}
    ${'camelCase'}    | ${'quickbrownfoxfromtown'}
    ${'pascalCase'}   | ${'quickbrownfoxfromtown'}
    ${'constantCase'} | ${'quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick.brown.fox.from.town'}
    ${'toggleCase'}   | ${'quick brown fox from town'}
    ${'noAccents'}    | ${'quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.lowerCase(input)).toBe(output);
  });
});
