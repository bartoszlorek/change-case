// @flow strict

// some abbreviation examples:
// A.B. abbr. Acad. A.D. alt. at.
// no. Capt. Dr. est. Sgt.

import {type Token} from './types';

const maxLength = 3;
const longAbbrv = new Set([
  'abbr',
  'absol',
  'abst',
  'abstr',
  'acad',
  'adjs',
  'advb',
  'anon',
  'approx',
  'appt',
  'blvd',
  'capt',
  'comdr',
  'corp',
  'dept',
  'grad',
  'misc',
  'pseud',
  'sept',
  'temp',
  'thurs',
  'tues',
  'univ',
]);

export function tagAbbreviation(tokens: Array<Token>): Array<Token> {
  return tokens.map((token, index) => {
    if (token.value !== '.') {
      return token;
    }

    const prevToken = tokens[index - 1];
    if (!prevToken || prevToken.type !== 'unassigned') {
      return token;
    }

    if (prevToken.value.length <= maxLength) {
      return {
        ...token,
        type: 'abbreviation',
      };
    }

    if (longAbbrv.has(prevToken.value.toLowerCase())) {
      return {
        ...token,
        type: 'abbreviation',
      };
    }

    return token;
  });
}
