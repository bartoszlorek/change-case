import {createDefinition} from './types';
import {Stack, upperCaseFirst} from '../helpers';
import {
  tokenizer,
  isNotEmptyToken,
  isAbbreviationToken,
  isOpeningQuotationToken,
  isClosingQuotationToken,
} from '../tokenizer';

import {noCase} from './noCase';

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

const endingSentence = /[.!?]/;

export function sentenceCaseV3(input: string) {
  // each quote (possibly nested) starts a new sentence
  // https://www.grammarly.com/blog/capitalization-in-quotes/
  const startedSentences = new Stack([false]);
  const openQuotationMarks = new Stack<string>();

  return tokenizer(input)
    .map(token => {
      let value = token.value;
      if (startedSentences.isCurrent(false) && isNotEmptyToken(token)) {
        startedSentences.setCurrent(true);
        value = upperCaseFirst(value);
      } else {
        value = value.toLocaleLowerCase();
      }

      if (endingSentence.test(token.break) && !isAbbreviationToken(token)) {
        startedSentences.setCurrent(false);
      }

      const openingMark = openQuotationMarks.current();
      if (openingMark && isClosingQuotationToken(token, openingMark)) {
        startedSentences.pop();
        openQuotationMarks.pop();
      }

      //
      else if (isOpeningQuotationToken(token)) {
        // when a quote starts a parent sentence
        if (startedSentences.isCurrent(false)) {
          startedSentences.setCurrent(true);
        }
        startedSentences.push(false);
        openQuotationMarks.push(token.break);
      }

      return value + token.break;
    })
    .join('');
}
