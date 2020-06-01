// @flow strict

export type Token = {
  value: string,
  type: TokenType,
};

// prettier-ignore
type TokenType =
  // basic
  | 'unassigned'  // default
  | 'punctuation' // not a word
  | 'whitespace'  // whitespace
  | 'colon'       // :
  | 'hyphen'      // -
  | 'end'         // .?!

  // abbreviation - dot after word
  | 'abbreviation'

  // extended
  | 'article'     // a, an, the
  | 'noun'
  | 'pronoun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'interjection';
