// @flow strict

import {tagBasic} from '../tagger/tagBasic';
import {wordTokenizer} from '../tokenizer/wordTokenizer';
import {replaceNumericSeparator} from './replaceNumericSeparator';
import {lowerCase} from './lowerCase';
import {upperCaseFirst} from './upperCaseFirst';

export function camelCase(value: string) {
  return tagBasic(wordTokenizer(value)).filter(scope).map(transform).join('');
}

function scope({type}) {
  return type === 'numeric' || type === 'unassigned';
}

function transform({value, type}, index) {
  let frag = lowerCase(value);

  if (type === 'numeric') {
    frag = replaceNumericSeparator(frag, '_');

    if (index > 0) {
      frag = '_' + frag;
    }
  } else if (index > 0) {
    frag = upperCaseFirst(frag);
  }

  return frag;
}
