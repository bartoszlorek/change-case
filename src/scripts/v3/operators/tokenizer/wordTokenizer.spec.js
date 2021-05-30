// @flow strict

import {wordTokenizer} from './wordTokenizer';

const values = token => token.value;

describe('wordTokenizer()', () => {
  it('tokenizes words', () => {
    expect(wordTokenizer('Hello World.').map(values)).toEqual([
      'Hello',
      ' ',
      'World',
      '.',
    ]);
  });

  it('tokenizes multiple whitespace', () => {
    expect(wordTokenizer('Hello   World.').map(values)).toEqual([
      'Hello',
      '   ',
      'World',
      '.',
    ]);
  });

  it('tokenizes multiple not a word characters', () => {
    expect(wordTokenizer('Hello %%World%%').map(values)).toEqual([
      'Hello',
      ' ',
      '%',
      '%',
      'World',
      '%',
      '%',
    ]);
  });

  it('tokenizes punctuation characters', () => {
    expect(
      wordTokenizer('Lord* of-the (Rings): Far Away!?').map(values),
    ).toEqual([
      'Lord',
      '*',
      ' ',
      'of',
      '-',
      'the',
      ' ',
      '(',
      'Rings',
      ')',
      ':',
      ' ',
      'Far',
      ' ',
      'Away',
      '!',
      '?',
    ]);
  });

  it('tokenizes non-latin characters', () => {
    expect(
      wordTokenizer('Duża śliwka aus dem grünen Obstgarten').map(values),
    ).toEqual([
      'Duża',
      ' ',
      'śliwka',
      ' ',
      'aus',
      ' ',
      'dem',
      ' ',
      'grünen',
      ' ',
      'Obstgarten',
    ]);
  });

  it('tokenizes numeric characters', () => {
    expect(wordTokenizer('she is 30 years old').map(values)).toEqual([
      'she',
      ' ',
      'is',
      ' ',
      '30',
      ' ',
      'years',
      ' ',
      'old',
    ]);
  });

  it('tokenizes numeric characters followed by latin', () => {
    expect(wordTokenizer('he weighs 70kg').map(values)).toEqual([
      'he',
      ' ',
      'weighs',
      ' ',
      '70kg',
    ]);
  });

  it('tokenizes numeric characters with dot or comma inside', () => {
    expect(wordTokenizer('to be exactly 6,620.6 km').map(values)).toEqual([
      'to',
      ' ',
      'be',
      ' ',
      'exactly',
      ' ',
      '6,620.6',
      ' ',
      'km',
    ]);
  });
});
