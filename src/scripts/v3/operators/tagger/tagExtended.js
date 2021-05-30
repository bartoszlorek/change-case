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
  'aboard', // preposition adverb adjective
  'about', // preposition adverb adjective
  'above', // preposition adverb
  'across', // preposition adverb
  'after', // preposition
  'against', // preposition
  'along', // preposition adverb
  'amid', // preposition
  'among', // preposition
  'around', // preposition adverb
  'as', // preposition conjunction
  'at', // preposition
  'before', // "IN", "RB", "RP"
  'behind', //  "IN", "NN", "RB", "RP"
  'below', // "IN", "RB"
  'beneath', // "IN", "RB"
  'beside', // "IN", "RB"
  'between', // "IN", "RB"
  'beyond', // "IN", "RB"
  'but', // "CC", "IN", "JJ", "RB"
  'by', //  "IN", "RB", "RP", "RB|RP"
  'concerning', // VBG
  'considering', // VBG
  'despite', // IN
  'down', // "RB", "IN|RB", "RBR", "VBP", "IN", "JJ", "NN", "RP", "VB"
  'during', // IN
  'except', // "IN", "VB"
  'following', // "VBG", "JJ", "NN"
  'for', // "IN", "NNP", "CC", "JJ", "RB", "RP"
  'from', // "IN", "RB", "RP"
  'in', // "IN", "FW",
  'inside',
  'into',
  'like',
  'minus',
  'near',
  'next',
  'of',
  'off',
  'on',
  'onto',
  'opposite',
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
  'than',
  'through',
  'till',
  'to',
  'toward',
  'under',
  'underneath',
  'unlike',
  'until',
  'up',
  'upon',
  'versus',
  'via',
  'with',
  'within',
  'without',
]);

// https://www.chompchomp.com/terms/coordinatingconjunction.htm
const coordinatingConjunctions = new Set([
  'and',
  'but',
  'for',
  'nor',
  'or',
  'so',
  'yet',
]);

// http://web.cn.edu/kwheeler/grammar_subordinate.html
const subordinateConjunctions = new Set([
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

    if (coordinatingConjunctions.has(value)) {
      return {
        ...token,
        type: 'coordinating_conjunction',
      };
    }

    if (subordinateConjunctions.has(value)) {
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
