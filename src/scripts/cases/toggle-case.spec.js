import cases from './index';
const {toggleCase} = cases;

describe('toggleCase()', () => {
  it.each`
    input                | output
    ${'quick brown fox'} | ${'QUICK BROWN FOX'}
    ${'quick BROWN fox'} | ${'QUICK brown FOX'}
  `('usage: $input —— $output', ({input, output}) => {
    expect(toggleCase(input)).toBe(output);
  });

  it.each`
    method            | output
    ${'upperCase'}    | ${'quick brown fox from town'}
    ${'lowerCase'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'titleCase'}    | ${'qUICK bROWN fOX FROM tOWN'}
    ${'sentenceCase'} | ${'qUICK BROWN FOX FROM TOWN'}
    ${'camelCase'}    | ${'QUICKbROWNfOXfROMtOWN'}
    ${'pascalCase'}   | ${'qUICKbROWNfOXfROMtOWN'}
    ${'constantCase'} | ${'quick_brown_fox_from_town'}
    ${'paramCase'}    | ${'QUICK-BROWN-FOX-FROM-TOWN'}
    ${'snakeCase'}    | ${'QUICK_BROWN_FOX_FROM_TOWN'}
    ${'dotCase'}      | ${'QUICK.BROWN.FOX.FROM.TOWN'}
    ${'toggleCase'}   | ${'quick brown fox from town'}
    ${'noAccents'}    | ${'QUICK BROWN FOX FROM TOWN'}
    ${'noCase'}       | ${'QUICK BROWN FOX FROM TOWN'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(toggleCase(input)).toBe(output);
  });
});
