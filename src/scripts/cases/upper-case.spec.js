import cases from './index';

describe('upperCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'lowerCase'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'titleCase'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'sentenceCase'} | ${'QUICK BROWN FOX FROM TOWN'}
    ${'camelCase'}    | ${'QUICKBROWNFOXFROMTOWN'}
    ${'pascalCase'}   | ${'QUICKBROWNFOXFROMTOWN'}
    ${'constantCase'} | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'paramCase'}    | ${'QUICK-BROWN-FOX-FROM-TOWN'}
    ${'snakeCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'dotCase'}      | ${'QUICK.BROWN.FOX.FROM.TOWN'}
    ${'toggleCase'}   | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noAccents'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noCase'}       | ${'QUICK BROWN FOX FROM TOWN'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(cases.upperCase(input)).toBe(output);
  });
});
