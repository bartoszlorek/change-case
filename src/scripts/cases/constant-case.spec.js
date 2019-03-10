import cases from './index';

describe('constantCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'lowerCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'titleCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'sentenceCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'camelCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'pascalCase'}   | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'paramCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'snakeCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'dotCase'}      | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'toggleCase'}   | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'noAccents'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'noCase'}       | ${'QUICK_BROWN_FOX_FROM_TOWN'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.constantCase(input)).toBe(output);
  });
});
