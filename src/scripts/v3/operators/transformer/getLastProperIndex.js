// @flow strict

import {type Token} from '../types';

export function getLastProperIndex(tokens: Array<Token>): number {
  let index = tokens.length;

  while (index--) {
    const {type} = tokens[index];

    if (
      type === 'unassigned' ||
      type === 'article' ||
      type === 'preposition' ||
      type === 'subordinating_conjunction' ||
      type === 'coordinating_conjunction'
    ) {
      return index;
    }
  }

  return -1;
}
