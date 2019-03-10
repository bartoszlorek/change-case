import cases from './index';
const {noCase} = cases;

describe('noCase()', () => {
  it.each`
    method            | output
    ${'upperCase'}    | ${'quick brown fox from town'}
    ${'lowerCase'}    | ${'quick brown fox from town'}
    ${'titleCase'}    | ${'quick brown fox from town'}
    ${'sentenceCase'} | ${'quick brown fox from town'}
    ${'camelCase'}    | ${'quick brown fox from town'}
    ${'pascalCase'}   | ${'quick brown fox from town'}
    ${'constantCase'} | ${'quick brown fox from town'}
    ${'paramCase'}    | ${'quick brown fox from town'}
    ${'snakeCase'}    | ${'quick brown fox from town'}
    ${'dotCase'}      | ${'quick brown fox from town'}
    ${'toggleCase'}   | ${'quick brown fox from town'}
    ${'noAccents'}    | ${'quick brown fox from town'}
    ${'noCase'}       | ${'quick brown fox from town'}
  `('converts from $method —— $output', ({method, output}) => {
    const input = cases[method]('quick brown fox from town');
    expect(noCase(input)).toBe(output);
  });

  describe('assertions:', () => {
    it('should remove non-word characters', () => {
      const result = noCase('The quick brown fox, which jumps over...');
      expect(result).toBe('the quick brown fox which jumps over');
    });
  });
});
