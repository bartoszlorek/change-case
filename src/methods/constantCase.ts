import {upperCase} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

// legacy
import {upperCase as legacyUpperCase} from './upperCase';
import {snakeCase as legacySnakeCase} from './snakeCase';

export function constantCase(value: string) {
  return legacyUpperCase(legacySnakeCase(value));
}

export function constantCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => upperCase(value))
    .join('_');
}
