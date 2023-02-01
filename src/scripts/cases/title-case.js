import escape from 'escape-regexp-component';
import noCase from './no-case';
import lowerCase from './lower-case';
import upperCase from './upper-case';

import MINOR_WORDS from './.internal/minor-words';

const COLON_REGEX = /:\s*./g;
const FIRST_LETTER_REGEX = /^.|[\"\-\.\:\_\s]+\'.|[\"\-\.\:\_\s]+./g;
const MINOR_REGEX = new RegExp(
  `\\s(${MINOR_WORDS.map(escape).join('|')})\\s`,
  'gi'
);

function titleCase(string) {
  return noCase(string)
    .replace(FIRST_LETTER_REGEX, upperCase)
    .replace(MINOR_REGEX, lowerCase)
    .replace(COLON_REGEX, upperCase);
}

export default titleCase;
