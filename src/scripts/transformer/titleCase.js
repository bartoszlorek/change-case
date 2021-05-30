// @flow strict

import {pipe} from './pipe';
import {tagBasic} from '../tagger/tagBasic';
import {tagExtended} from '../tagger/tagExtended';

import {wordTokenizer} from '../tokenizer/wordTokenizer';
import {isProperName} from './isProperName';
import {getLastProperIndex} from './getLastProperIndex';

import {lowerCase} from './lowerCase';
import {upperCaseFirst} from './upperCaseFirst';

export function titleCase(value: string) {
  const tag = pipe(tagBasic, tagExtended);
  const tokens = tag(wordTokenizer(value));

  const lastProperIndex = getLastProperIndex(tokens);
  return tokens.map(transform(lastProperIndex)).join('');
}

function transform(lastProperIndex: number) {
  return ({value, type}, index, array) => {
    if (isProperName(value)) {
      return value;
    }

    let frag = lowerCase(value);

    if (index === 0 || index === lastProperIndex) {
      return upperCaseFirst(frag);
    }

    if (
      type === 'article' ||
      type === 'preposition' ||
      type === 'coordinating_conjunction'
    ) {
      return frag;
    }

    const prevToken = array[index - 1];

    if (prevToken && prevToken.type === 'apostrophe') {
      return frag;
    }

    return upperCaseFirst(frag);
  };
}
