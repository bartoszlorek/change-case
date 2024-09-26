import {camelCase} from '../methods/v3';
import {composeMethod, parseCommaList} from './composition';

describe('composeMethod()', () => {
  const input = 'The quick brown fox jumps over the lazy dog.';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    ignoreList               | correctList              | output
    ${undefined}             | ${undefined}             | ${'theQuickBrownFoxJumpsOverTheLazyDog'}
    ${'THE QUICK BROWN FOX'} | ${undefined}             | ${'The quick brown foxJumpsOverTheLazyDog'}
    ${undefined}             | ${'THE_QUICK_BROWN_FOX'} | ${'THE_QUICK_BROWN_FOXJumpsOverTheLazyDog'}
    ${'THE QUICK BROWN FOX'} | ${'QUICK BROWN'}         | ${'The QUICK BROWN foxJumpsOverTheLazyDog'}
  `('returns "$output"', async ({ignoreList, correctList, output}) => {
    (chrome.storage.sync.get as jest.Mock).mockResolvedValueOnce({
      ignoreList,
      correctList,
    });

    const composedMethod = await composeMethod(camelCase);
    expect(composedMethod(input)).toEqual(output);
  });
});

describe('parseCommaList()', () => {
  it.each`
    input             | output
    ${''}             | ${[]}
    ${'  '}           | ${[]}
    ${'a,b,c'}        | ${['a', 'b', 'c']}
    ${'a,a,c'}        | ${['a', 'c']}
    ${' a,b bb , c '} | ${['a', 'b bb', 'c']}
  `('"$input" => $output', ({input, output}) => {
    expect(parseCommaList(input)).toEqual(output);
  });
});
