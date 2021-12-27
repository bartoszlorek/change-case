// @flow strict

const BASIC_LATIN = 'A-Za-z';
const LATIN1_SUPPLEMENT = '\u00C0-\u00FF';
const LATIN_EXTENDED_A = '\u0100-\u017F';
const LATIN_EXTENDED_B = '\u0180-\u024F';
const LATIN_EXTENDED_ADDITIONAL = '\u1E00-\u1EFF';

export const LATIN_RANGE =
  BASIC_LATIN +
  LATIN1_SUPPLEMENT +
  LATIN_EXTENDED_A +
  LATIN_EXTENDED_B +
  LATIN_EXTENDED_ADDITIONAL;

const WORD_PATTERN = new RegExp(
  `[${LATIN_RANGE}]+|\\s+|[\\d.,]+[${LATIN_RANGE}]*|[^\\s${LATIN_RANGE}]`,
  'g',
);

export function wordTokenizer(text: string) {
  return text.match(WORD_PATTERN) || [];
}
