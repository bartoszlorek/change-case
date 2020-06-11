// @flow strict

import {latinRange} from '../tokenizer/wordTokenizer';
import {type Token} from '../types';

const definedTags = {
  ' ': 'whitespace',
  ':': 'colon',
  '-': 'hyphen',
  '.': 'end',
  '?': 'end',
  '!': 'end',
  "'": 'apostrophe',
  '’': 'apostrophe',
};

export function tagBasic(tokens: Array<Token>): Array<Token> {
  return tokens.map(token => {
    const firstChar = token.value[0];

    if (isLatinChar(firstChar)) {
      return {
        ...token,
        type: 'unassigned',
      };
    }

    if (definedTags[firstChar] !== undefined) {
      return {
        ...token,
        type: definedTags[firstChar],
      };
    }

    return {
      ...token,
      type: 'punctuation',
    };
  });
}

function isLatinChar(char: string) {
  return new RegExp(`[${latinRange}]`).test(char);
}
