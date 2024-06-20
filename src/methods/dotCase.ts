import {createDefinition} from './types';
import {tokenizer, notEmptyToken} from '../helpers/tokenizer';
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
    .filter(notEmptyToken)
    .map<string>(({value}) => lowerCaseV3(value))
    .join('.');
}
