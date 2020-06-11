// @flow strict

import {tagBasic} from '../tagger/tagBasic';
import {wordTokenizer} from '../tokenizer/wordTokenizer';
import {lowerCase} from './lowerCase';
import {replaceNumericSeparator} from './replaceNumericSeparator';

export function snakeCase(value: string) {
  return tagBasic(wordTokenizer(value)).filter(scope).map(transform).join('_');
}

function scope({type}) {
  return type === 'numeric' || type === 'unassigned';
}

function transform({value, type}) {
  let frag = lowerCase(value);

  if (type === 'numeric') {
    frag = replaceNumericSeparator(frag, '_');
  }

  return frag;
}
