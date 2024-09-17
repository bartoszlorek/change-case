// legacy
import {noCase as legacyNoCase} from './noCase';
import {lowerCase as legacyLowerCase} from './lowerCase';
import {upperCase as legacyUpperCase} from './upperCase';

const MINOR_WORDS = [
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'en',
  'for',
  'from',
  'how',
  'if',
  'in',
  'neither',
  'nor',
  'of',
  'on',
  'only',
  'onto',
  'out',
  'or',
  'per',
  'so',
  'than',
  'that',
  'the',
  'to',
  'until',
  'up',
  'upon',
  'v',
  'v.',
  'versus',
  'vs',
  'vs.',
  'via',
  'when',
  'with',
  'without',
  'yet',
];

const COLON_REGEX = /:\s*./g;
const FIRST_LETTER_REGEX = /^.|[-_.:\s]+./g;
const MINOR_REGEX = new RegExp(
  `\\s(${MINOR_WORDS.map(escape).join('|')})\\s`,
  'gi'
);

export function titleCase(value: string) {
  return legacyNoCase(value, null)
    .replace(FIRST_LETTER_REGEX, legacyUpperCase)
    .replace(MINOR_REGEX, legacyLowerCase)
    .replace(COLON_REGEX, legacyUpperCase);
}

/**
 * https://www.npmjs.com/package/escape-regexp-component
 */
function escape(value: string) {
  return value.replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1');
}
