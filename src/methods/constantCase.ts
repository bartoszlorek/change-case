import {createDefinition} from './types';
import {tokenizer, isNotEmptyToken} from '../tokenizer';
import {upperCaseV3} from './upperCase';

import {upperCase} from './upperCase';
import {snakeCase} from './snakeCase';

export const constantCaseDef = createDefinition({
  name: 'constantCase',
  text: 'CONSTANT_CASE',
});

export function constantCase(value: string) {
  return upperCase(snakeCase(value));
}

export function constantCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => upperCaseV3(value))
    .join('_');
}
