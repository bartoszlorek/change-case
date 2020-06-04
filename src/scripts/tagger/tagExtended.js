// @flow strict

import posTagger from 'wink-pos-tagger';
import {type Token, type TokenType} from './types';

// todo:
// - to-infinitive
// - possessive ending 's

type TagType = {
  value: string,
  tag: string,
  pos: string,
  normal: string,
  lemma: string,
};

const articles = new Set(['a', 'an', 'the']);

const posTypeMap: {[pos: string]: TokenType} = {
  VB: 'verb',
  VBD: 'verb',
  VBG: 'verb',
  VBN: 'verb',
  VBP: 'verb',
  VBZ: 'verb',
  MD: 'verb',
  NN: 'noun',
  NNS: 'noun',
  NNP: 'noun',
  NNPS: 'noun',
  JJ: 'adjective',
  JJR: 'adjective',
  JJS: 'adjective',
  DT: 'determiner',
  PDT: 'determiner',
  WDT: 'determiner',
  RB: 'adverb',
  RBR: 'adverb',
  RBS: 'adverb',
  WRB: 'adverb',
  EX: 'adverb',
  PRP: 'pronoun',
  PRP$: 'pronoun',
  WP: 'pronoun',
  WP$: 'pronoun',
  IN: 'preposition',
  CC: 'conjunction',
  UH: 'interjection',
  RP: 'particle',
};

export function tagExtended(tokens: Array<Token>): Array<Token> {
  const tagger = posTagger();
  const tokensValue = [];
  const tokensIndex = [];

  for (let index = 0; index < tokens.length; index++) {
    const {value, type} = tokens[index];

    if (type === 'unassigned') {
      tokensValue.push(value);
      tokensIndex.push(index);
    }
  }

  const tags: Array<TagType> = tagger.tagRawTokens(tokensValue);
  const output = tokens.map(a => ({...a})); // clone

  for (let index = 0; index < tags.length; index++) {
    const token = output[tokensIndex[index]];
    const {pos} = tags[index];

    if (articles.has(token.value.toLowerCase())) {
      token.type = 'article';
    } else {
      token.type = posTypeMap[pos] || 'unassigned';
    }
  }

  return output;
}
