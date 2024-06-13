import {createDefinition} from './types';
import {noCase} from './noCase';
import {lowerCase} from './lowerCase';
import {upperCase} from './upperCase';

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

export const titleCaseDef = createDefinition({
  name: 'titleCase',
  text: 'Title Case',
});

export function titleCase(value: string) {
  return noCase(value, null)
    .replace(FIRST_LETTER_REGEX, upperCase)
    .replace(MINOR_REGEX, lowerCase)
    .replace(COLON_REGEX, upperCase);
}

/**
 * https://www.npmjs.com/package/escape-regexp-component
 */
function escape(value: string) {
  return value.replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1');
}
