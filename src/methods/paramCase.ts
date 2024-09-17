import {lowerCase} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

// legacy
import {noCase as legacyNoCase} from './noCase';

export function paramCase(value: string) {
  return legacyNoCase(value, '-');
}

export function paramCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => lowerCase(value))
    .join('-');
}
