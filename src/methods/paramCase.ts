import {createDefinition} from './types';
import {tokenizer, isNotEmptyToken} from '../tokenizer';
import {lowerCaseV3} from './lowerCase';

import {noCase} from './noCase';

export const paramCaseDef = createDefinition({
  name: 'paramCase',
  text: 'param-case',
});

export function paramCase(value: string) {
  return noCase(value, '-');
}

export function paramCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => lowerCaseV3(value))
    .join('-');
}
