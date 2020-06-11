// @flow strict

import {tagBasic} from '../tagger/tagBasic';
import {wordTokenizer} from '../tokenizer/wordTokenizer';
import {upperCaseFirst} from './upperCaseFirst';
import {lowerCase} from './lowerCase';

function scope(token) {
  return token.type === 'numeric' || token.type === 'unassigned';
}

function transform(token, index) {
  const {value, type} = token;
  let frag = lowerCase(value);

  if (type === 'numeric') {
    frag = frag.replace(/[.,]/, '_');

    if (index > 0) {
      frag = '_' + frag;
    }
  } else if (index > 0) {
    frag = upperCaseFirst(frag);
  }

  return frag;
}

export function camelCase(value: string) {
  const tokens = tagBasic(wordTokenizer(value));
  return tokens.filter(scope).map(transform).join('');
}
