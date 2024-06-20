import {createDefinition} from './types';
import {tokenizer, notEmptyToken} from '../helpers/tokenizer';
import {lowerCaseV3} from './lowerCase';

import {noCase} from './noCase';

export const snakeCaseDef = createDefinition({
  name: 'snakeCase',
  text: 'snake_case',
});

export function snakeCase(value: string) {
  return noCase(value, '_');
}

export function snakeCaseV3(input: string) {
  return tokenizer(input)
    .filter(notEmptyToken)
    .map<string>(({value}) => lowerCaseV3(value))
    .join('_');
}
