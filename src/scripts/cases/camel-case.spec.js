import cases from './index';

describe('camelCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'quickBrownFoxFromTown'}
    ${'lowerCase'}    | ${'quickBrownFoxFromTown'}
    ${'titleCase'}    | ${'quickBrownFoxFromTown'}
    ${'sentenceCase'} | ${'quickBrownFoxFromTown'}
    ${'camelCase'}    | ${'quickBrownFoxFromTown'}
    ${'pascalCase'}   | ${'quickBrownFoxFromTown'}
    ${'constantCase'} | ${'quickBrownFoxFromTown'}
    ${'paramCase'}    | ${'quickBrownFoxFromTown'}
    ${'snakeCase'}    | ${'quickBrownFoxFromTown'}
    ${'dotCase'}      | ${'quickBrownFoxFromTown'}
    ${'toggleCase'}   | ${'quickBrownFoxFromTown'}
    ${'noAccents'}    | ${'quickBrownFoxFromTown'}
    ${'noCase'}       | ${'quickBrownFoxFromTown'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.camelCase(input)).toBe(output);
  });
});
