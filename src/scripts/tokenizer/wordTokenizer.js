// @flow strict

const basicLatin = 'A-Za-z';
const latin1Supplement = '\u00C0-\u00FF';
const latinExtendedA = '\u0100-\u017F';
const latinExtendedB = '\u0180-\u024F';
const latinExtendedAdditional = '\u1E00-\u1EFF';

export const latinRange =
  basicLatin +
  latin1Supplement +
  latinExtendedA +
  latinExtendedB +
  latinExtendedAdditional;

const pattern = new RegExp(`[${latinRange}]+|\\s+|[^\\s${latinRange}]`, 'g');

export function wordTokenizer(text: string) {
  return text.match(pattern);
}
