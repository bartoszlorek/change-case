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
  | 'numeric'     // 0123456789
  | 'apostrophe'  // '’
  | 'whitespace'  // whitespace
  | 'colon'       // :
  | 'hyphen'      // -
  | 'end'         // .?!

  // abbreviation - dot after word
  | 'abbreviation'

  // extended
  | 'article'
  | 'preposition'
  | 'subordinating_conjunction'
  | 'coordinating_conjunction'
