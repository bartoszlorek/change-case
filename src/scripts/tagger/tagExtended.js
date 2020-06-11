// @flow strict

import posTagger from 'wink-pos-tagger';
import {type Token, type TokenType} from '../types';

// prettier-ignore
const articles = new Set([
  'a',
  'an',
  'the',
]);

const prepositions = new Set([
  'aboard',
  'about',
  'above',
  'across',
  'after',
  'against',
  'along',
  'alongside',
  'amid',
  'amidst',
  'among',
  'amongst',
  'anti',
  'around',
  'astride',
  'at',
  'atop',
  'before',
  'behind',
  'below',
  'beneath',
  'beside',
  'besides',
  'between',
  'beyond',
  'but',
  'by',
  'circa',
  'concerning',
  'considering',
  'despite',
  'down',
  'during',
  'except',
  'excepting',
  'excluding',
  'following',
  'for',
  'from',
  'in',
  'including',
  'inside',
  'into',
  'like',
  'minus',
  'near',
  'next',
  'of',
  'off',
  'nor',
  'on',
  'onto',
  'opposite',
  'or',
  'out',
  'outside',
  'over',
  'past',
  'per',
  'plus',
  'regarding',
  'round',
  'save',
  'since',
  'through',
  'throughout',
  'till',
  'to',
  'toward',
  'towards',
  'under',
  'underneath',
  'unlike',
  'until',
  'unto',
  'up',
  'upon',
  'versus',
  'via',
  'v',
  'vs',
  'with',
  'within',
  'without',
  'worth',
]);

const coordConjunctions = new Set([
  'and',
  'but',
  'for',
  'nor',
  'or',
  'so',
  'yet',
]);

const subConjunctions = new Set([
  'after',
  'although',
  'because',
  'before',
  'if',
  'since',
  'so',
  'than',
  'though',
  'unless',
  'until',
  'when',
  'whenever',
  'where',
  'whereas',
  'wherever',
  'while',
]);

export function tagExtended(tokens: Array<Token>): Array<Token> {
  return tokens.map((token, index) => {
    if (token.type !== 'unassigned') {
      return token;
    }

    const value = token.value.toLowerCase();

    if (articles.has(value)) {
      return {
        ...token,
        type: 'article',
      };
    }

    if (coordConjunctions.has(value)) {
      return {
        ...token,
        type: 'coordinating_conjunction',
      };
    }

    if (subConjunctions.has(value)) {
      return {
        ...token,
        type: 'subordinating_conjunction',
      };
    }

    if (prepositions.has(value)) {
      return {
        ...token,
        type: 'preposition',
      };
    }

    return token;
  });
}
