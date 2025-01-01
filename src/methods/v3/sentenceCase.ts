import {Stack, upperCaseFirst, lowerCase} from '../../helpers';
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
      value = lowerCase(value);
    }

    if (endingSentence.test(token.extra) && !token.isAbbreviation()) {
      startedSentences.setCurrent(false);
    }

    const openingMark = openQuotationMarks.current();
    if (openingMark && token.isClosingQuotation(openingMark)) {
      startedSentences.pop();
      openQuotationMarks.pop();
    }

    //
    else if (token.isOpeningQuotation()) {
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
