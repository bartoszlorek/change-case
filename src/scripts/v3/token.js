// @flow strict

type BasicTokenType =
  /**
   * default
   */
  | 'word'
  /**
   * not a word characters
   */
  | 'punctuation'
  /**
   * one or more whitespace characters
   */
  | 'whitespace'
  /**
   * including dot/comma between them or unit symbol
   */
  | 'numeric';

type ExtendedTokenType =
  /**
   * a, an, the
   */
  | 'article'
  | 'preposition'
  | 'subordinating_conjunction'
  | 'coordinating_conjunction';

export interface Token {
  type: BasicTokenType | ExtendedTokenType;
  value: string;
}
