import {camelCase} from '../methods';
import {parseCommaList, composeMethod} from './composition';

describe('parseCommaList()', () => {
  it.each`
    input             | output
    ${''}             | ${[]}
    ${'  '}           | ${[]}
    ${'a,b,c'}        | ${['a', 'b', 'c']}
    ${' a,b bb , c '} | ${['a', 'b bb', 'c']}
  `('"$input" => $output', ({input, output}) => {
    expect(parseCommaList(input)).toEqual(output);
  });
});

describe('composeMethod()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    ignoreList    | correctList     | input                        | output
    ${undefined}  | ${undefined}    | ${'lazy brown fox'}          | ${'lazyBrownFox'}
    ${'BROWN'}    | ${undefined}    | ${'lazy brown fox'}          | ${'lazybrownFox'}
    ${undefined}  | ${'BROWN'}      | ${'lazy brown fox'}          | ${'lazyBROWNFox'}
    ${'Lazy fox'} | ${'DOG'}        | ${'Lazy fox eats lazy dog.'} | ${'Lazy foxEatsLazyDOG'}
    ${'in, home'} | ${'I am, John'} | ${'i am john in home.'}      | ${'I amJohninhome'}
  `(
    '"$input" => "$output"',
    async ({ignoreList, correctList, input, output}) => {
      (chrome.storage.sync.get as jest.Mock).mockResolvedValueOnce({
        ignoreList,
        correctList,
      });

      const composedMethod = await composeMethod(camelCase);
      expect(composedMethod(input)).toEqual(output);
    }
  );
});
