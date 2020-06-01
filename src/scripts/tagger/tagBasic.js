// @flow strict

import {latinRange} from '../tokenizer/wordTokenizer';
import {type Token} from './types';

const definedTags = {
  ' ': 'whitespace',
  ':': 'colon',
  '-': 'hyphen',
  '.': 'end',
  '?': 'end',
  '!': 'end',
};

export function tagBasic(tokenValues: Array<string>): Array<Token> {
  return tokenValues.map(value => {
    const char = value[0];

    if (isLatinChar(char)) {
      return {
        value,
        type: 'unassigned',
      };
    }

    if (definedTags[char] !== undefined) {
      return {
        value,
        type: definedTags[char],
      };
    }

    return {
      value,
      type: 'punctuation',
    };
  });
}

function isLatinChar(char: string) {
  return new RegExp(`[${latinRange}]`).test(char);
}
