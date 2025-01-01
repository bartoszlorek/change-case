import {Token} from './token';

/**
 * https://en.wikipedia.org/wiki/Quotation_mark
 * https://www.grammarly.com/blog/quotation-marks/
 */
type OpeningMark = string;
type ClosingMark = string;

/**
 * https://docs.google.com/spreadsheets/d/1CGYlgdZq3x_Ti1n_l-m0Qc4BhsIoHv_AjjMhlbdxrZ4/edit?gid=1757917121#gid=1757917121
 */
const possiblePairs: [OpeningMark, ClosingMark][] = [
  [`“`, `”`],
  [`‘`, `’`],
  [`„`, `”`],
  [`‚`, `’`],
  [`„`, `“`],
  [`«`, `»`],
  [`‹`, `›`],
  [`”`, `”`],
  [`’`, `’`],
  [`»`, `«`],
  [`‚`, `‘`],
  [`›`, `‹`],
  [`»`, `»`],
  [`"`, `"`],
  [`’`, `‘`],
];

const openingMarks = [...new Set(possiblePairs.map(a => a[0]))];
const closingMarksMap = new Map<OpeningMark, ClosingMark[]>();

for (const [openingMark, closingMark] of possiblePairs) {
  const closingMarks = closingMarksMap.get(openingMark) || [];
  closingMarksMap.set(openingMark, closingMarks);
  closingMarks.push(closingMark);
}

export function isOpeningQuotationToken(token: Token) {
  return token.value === '' && openingMarks.includes(token.extra);
}

export function isClosingQuotationToken(token: Token, openingMark: string) {
  const closingMarks = closingMarksMap.get(openingMark);
  return closingMarks?.includes(token.extra) || false;
}
