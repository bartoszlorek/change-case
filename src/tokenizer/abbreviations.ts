import {Token} from './token';

/**
 * https://www.grammarly.com/blog/abbreviations/
 * https://www.grammar-monster.com/lessons/abbreviations_full_stops_periods.htm
 * https://edu.gcfglobal.org/en/grammar/abbreviations-and-acronyms/1/
 * https://www.sussex.ac.uk/informatics/punctuation/capsandabbr/abbr
 */
const threeOrMoreLetterAbbreviations = [
  'apt', // apartment
  'ave', // avenue
  'blvd', // boulevard
  'hwy', // highway
  'ste', // suite

  'capt', // captain
  'col', // colonel
  'cpl', // corporal
  'gen', // general
  'gov', // governor
  'prof', // professor
  'sgt', // sergeant
  'revd', // reverend
  'rev', // reverend
  'hon', // honorary
  'mrs', // mistress
  'mgr', // manager

  'acad', // academy
  'assoc', // association
  'corp', // corporation
  'dept', // department
  'inc', // incorporated
  'ltd', // limited
  'est', // established
  'alt', // alternative

  'jan', // January
  'feb', // February
  'mar', // March
  'apr', // April
  'jun', // June
  'jul', // July
  'aug', // August
  'sep', // September
  'oct', // October
  'nov', // November
  'dec', // December

  'mon', // Monday
  'tue', // Tuesday
  'tues', // Tuesday
  'wed', // Wednesday
  'thu', // Thursday
  'thur', // Thursday
  'thurs', // Thursday
  'fri', // Friday
  'sat', // Saturday
  'sun', // Sunday

  'etc',
  'lbs',
];

/**
 * https://en.wiktionary.org/wiki/Appendix:Glossary_of_two-letter_English_words
 */
const popularTwoLetterWords = [
  'am',
  'an',
  'as',
  'at',
  'ax',
  'be',
  'by',
  'do',
  'go',
  'he',
  'if',
  'in',
  'is',
  'it',
  'me',
  'my',
  'no',
  'of',
  'ok',
  'on',
  'or',
  'ox',
  'so',
  'to',
  'up',
  'us',
  'we',
];

export function isAbbreviationToken(token: Token) {
  if (token.extra !== '.') {
    return false;
  }

  const lowerValue = token.value.toLowerCase();
  if (lowerValue.length >= 3) {
    return threeOrMoreLetterAbbreviations.includes(lowerValue);
  }

  // v. e.g. i.e. Dr. Mr. St.
  return !popularTwoLetterWords.includes(lowerValue);
}
