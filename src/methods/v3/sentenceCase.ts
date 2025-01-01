import {Stack, upperCaseFirst} from '../../helpers';
import {
  isAbbreviationToken,
  isOpeningQuotationToken,
  isClosingQuotationToken,
} from '../../tokenizer';
import type {MethodHandler} from '../types';

const endingSentence = /[.!?]/;

export function sentenceCase(): MethodHandler {
  // each quote (possibly nested) starts a new sentence
  // https://www.grammarly.com/blog/capitalization-in-quotes/
  const startedSentences = new Stack([false]);
  const openQuotationMarks = new Stack<string>();

  return token => {
    let value = token.value;
    if (startedSentences.isCurrent(false) && token.isNotEmpty()) {
      startedSentences.setCurrent(true);
      value = upperCaseFirst(value);
    } else {
      value = value.toLocaleLowerCase();
    }

    if (endingSentence.test(token.extra) && !isAbbreviationToken(token)) {
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
      openQuotationMarks.push(token.extra);
    }

    return value + token.extra;
  };
}
