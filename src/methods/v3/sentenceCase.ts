import {Stack, upperCaseFirst} from '../../helpers';
import {
  tokenizer,
  isNotEmptyToken,
  isAbbreviationToken,
  isOpeningQuotationToken,
  isClosingQuotationToken,
} from '../../tokenizer';

const endingSentence = /[.!?]/;

export function sentenceCase(input: string) {
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
