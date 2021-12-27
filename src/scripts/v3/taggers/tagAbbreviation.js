// @flow strict

import {type Token} from '../token';
import {abbreviations, prepositions} from './dictionary';

const autoMaxLength = 3;

/**
 * It tags dot after the abbreviation word.
 *
 * Common abbreviations:
 * A.B. abbr. Acad. A.D. alt. at. no. Capt. Dr. est. Sgt.
 */
export const tagAbbreviation =
  (context: Token[]) =>
  (token: Token): Token => {
    const prevToken = context[token.index - 1];

    if (token.value !== '.' || !prevToken || prevToken.value === '.') {
      return token;
    }

    if (abbreviations.has(prevToken.value.toLowerCase())) {
      return {...token, type: 'abbreviation'};
    }

    if (prevToken.value.length <= autoMaxLength) {
      if (!prepositions.has(prevToken.value)) {
        return {...token, type: 'abbreviation'};
      }
    }

    return token;
  };
