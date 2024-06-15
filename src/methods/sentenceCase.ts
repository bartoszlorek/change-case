import {createDefinition} from './types';
import {noCase} from './noCase';
import {upperCase} from './upperCase';

const NOT_EMPTY = (value: string) => value !== '';

export const sentenceCaseDef = createDefinition({
  name: 'sentenceCase',
  text: 'Sentence case',
});

export function sentenceCase(value: string) {
  const frags = noCase(value, null).split(SENTENCES_REGEXP).filter(NOT_EMPTY);

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

function upperCaseFirst(value: string) {
  value = String(value);
  return upperCase(value.charAt(0)) + value.substr(1);
}

const SENTENCES_REGEXP = /(\s+|.*?[.!?]|.*)/g;

// A.B. abbr. Acad. A.D. alt. at. no. Capt. Dr. est. Sgt. ...
// it's not a perfect solution but works in many common cases:
// - abbrv contains 3 or less characters (there are with more but...)
// - abbrv starts with capital letter
// - abbrv ends with dot (issue of parsing sentence)

const MAX_LENGTH = 3;
const LAST_WORD = /([^\s]*?)\.+$/m;

function isAbbreviation(value: string) {
  if (!value || value[value.length - 1] !== '.') {
    return false;
  }
  let last = value.match(LAST_WORD)?.[1] || '';
  return last.length <= MAX_LENGTH || last[0] === last[0].toUpperCase();
}
