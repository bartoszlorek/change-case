import {createDefinition} from './types';
import {tokenizer, isNotEmptyToken} from '../tokenizer';
import {lowerCaseV3} from './lowerCase';

import {noCase} from './noCase';

export const dotCaseDef = createDefinition({
  name: 'dotCase',
  text: 'dot.case',
});

export function dotCase(value: string) {
  return noCase(value, '.');
}

export function dotCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => lowerCaseV3(value))
    .join('.');
}
