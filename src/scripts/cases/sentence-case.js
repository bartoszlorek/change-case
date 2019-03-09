import noCase from './no-case';
import upperCaseFirst from './.internal/upper-case-first';
import isAbbreviation from './.internal/is-abbreviation';

import SENTENCES_REGEXP from './.internal/sentences-regexp';

const NOT_EMPTY = val => val !== '';

function sentenceCase(string) {
  const frags = noCase(string)
    .split(SENTENCES_REGEXP)
    .filter(NOT_EMPTY);

  let prev = false;
  return frags.reduce((result, frag, index) => {
    if (frag[0] !== ' ') {
      if (prev === false) {
        frag = upperCaseFirst(frag);
      }
      prev = isAbbreviation(frag);
    }
    return result + frag;
  }, '');
}

export default sentenceCase;
