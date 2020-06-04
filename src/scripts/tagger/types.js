// @flow strict

export type Token = {
  value: string,
  type: TokenType,
};

// prettier-ignore
export type TokenType =
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
  | 'verb' 
  | 'noun'
  | 'adjective'
  | 'determiner'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'particle'
  | 'article';
