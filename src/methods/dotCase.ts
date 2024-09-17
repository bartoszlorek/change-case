import {lowerCase} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

// legacy
import {noCase as legacyNoCase} from './noCase';

export function dotCase(value: string) {
  return legacyNoCase(value, '.');
}

export function dotCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => lowerCase(value))
    .join('.');
}
