// @flow strict

import {tagBasic} from '../tagger/tagBasic';
import {wordTokenizer} from '../tokenizer/wordTokenizer';
import {replaceNumericSeparator} from './replaceNumericSeparator';
import {upperCase} from './upperCase';

export function constantCase(value: string) {
  return tagBasic(wordTokenizer(value)).filter(scope).map(transform).join('_');
}

function scope({type}) {
  return type === 'numeric' || type === 'unassigned';
}

function transform({value, type}) {
  let frag = upperCase(value);

  if (type === 'numeric') {
    frag = replaceNumericSeparator(frag, '_');
  }

  return frag;
}
