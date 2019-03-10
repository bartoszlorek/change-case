import cases from './index';

describe('paramCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'quick-brown-fox-from-town'}
    ${'lowerCase'}    | ${'quick-brown-fox-from-town'}
    ${'titleCase'}    | ${'quick-brown-fox-from-town'}
    ${'sentenceCase'} | ${'quick-brown-fox-from-town'}
    ${'camelCase'}    | ${'quick-brown-fox-from-town'}
    ${'pascalCase'}   | ${'quick-brown-fox-from-town'}
    ${'constantCase'} | ${'quick-brown-fox-from-town'}
    ${'paramCase'}    | ${'quick-brown-fox-from-town'}
    ${'snakeCase'}    | ${'quick-brown-fox-from-town'}
    ${'dotCase'}      | ${'quick-brown-fox-from-town'}
    ${'toggleCase'}   | ${'quick-brown-fox-from-town'}
    ${'noAccents'}    | ${'quick-brown-fox-from-town'}
    ${'noCase'}       | ${'quick-brown-fox-from-town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.paramCase(input)).toBe(output);
  });
});
