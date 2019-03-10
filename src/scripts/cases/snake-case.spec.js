import cases from './index';

describe('snakeCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'quick_brown_fox_from_town'}
    ${'lowerCase'}    | ${'quick_brown_fox_from_town'}
    ${'titleCase'}    | ${'quick_brown_fox_from_town'}
    ${'sentenceCase'} | ${'quick_brown_fox_from_town'}
    ${'camelCase'}    | ${'quick_brown_fox_from_town'}
    ${'pascalCase'}   | ${'quick_brown_fox_from_town'}
    ${'constantCase'} | ${'quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'quick_brown_fox_from_town'}
    ${'snakeCase'}    | ${'quick_brown_fox_from_town'}
    ${'dotCase'}      | ${'quick_brown_fox_from_town'}
    ${'toggleCase'}   | ${'quick_brown_fox_from_town'}
    ${'noAccents'}    | ${'quick_brown_fox_from_town'}
    ${'noCase'}       | ${'quick_brown_fox_from_town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.snakeCase(input)).toBe(output);
  });
});
