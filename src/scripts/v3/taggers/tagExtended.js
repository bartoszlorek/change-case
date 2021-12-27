// @flow strict

import {type Token} from '../token';
import {
  articles,
  coordinatingConjunctions,
  subordinateConjunctions,
  prepositions,
} from './dictionary';

export const tagExtended = (token: Token): Token => {
  if (token.type !== 'unknown') {
    return token;
  }
  const lowerCaseValue = token.value.toLowerCase();

  if (articles.has(lowerCaseValue)) {
    return {...token, type: 'article'};
  }

  if (coordinatingConjunctions.has(lowerCaseValue)) {
    return {...token, type: 'coordinating_conjunction'};
  }

  if (subordinateConjunctions.has(lowerCaseValue)) {
    return {...token, type: 'subordinating_conjunction'};
  }

  if (prepositions.has(lowerCaseValue)) {
    return {...token, type: 'preposition'};
  }

  return token;
};
