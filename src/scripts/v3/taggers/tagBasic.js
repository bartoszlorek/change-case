// @flow strict

import {latinRange} from '../tokenizers/wordTokenizer';
import {type Token} from '../token';

const basicTypeChars = {
  ' ': 'whitespace',
  ':': 'colon',
  '-': 'hyphen',
  '.': 'end',
  '?': 'end',
  '!': 'end',
  "'": 'apostrophe',
  '’': 'apostrophe',
};

const latinRangeRegex = new RegExp(`[${latinRange}]`);
const isLatin = value => latinRangeRegex.test(value);
const isNumeric = value => !!+value;

export const tagBasic = (token: Token): Token => {
  const firstChar = token.value[0];

  if (basicTypeChars[firstChar] !== undefined) {
    return {...token, type: basicTypeChars[firstChar]};
  }

  if (isNumeric(firstChar)) {
    return {...token, type: 'numeric'};
  }

  if (isLatin(firstChar)) {
    return token;
  }

  return {...token, type: 'punctuation'};
};
