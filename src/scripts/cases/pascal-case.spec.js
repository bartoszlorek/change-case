import cases from './index';

describe('pascalCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'QuickBrownFoxFromTown'}
    ${'lowerCase'}    | ${'QuickBrownFoxFromTown'}
    ${'titleCase'}    | ${'QuickBrownFoxFromTown'}
    ${'sentenceCase'} | ${'QuickBrownFoxFromTown'}
    ${'camelCase'}    | ${'QuickBrownFoxFromTown'}
    ${'pascalCase'}   | ${'QuickBrownFoxFromTown'}
    ${'constantCase'} | ${'QuickBrownFoxFromTown'}
    ${'paramCase'}    | ${'QuickBrownFoxFromTown'}
    ${'snakeCase'}    | ${'QuickBrownFoxFromTown'}
    ${'dotCase'}      | ${'QuickBrownFoxFromTown'}
    ${'toggleCase'}   | ${'QuickBrownFoxFromTown'}
    ${'noAccents'}    | ${'QuickBrownFoxFromTown'}
    ${'noCase'}       | ${'QuickBrownFoxFromTown'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.pascalCase(input)).toBe(output);
  });
});
