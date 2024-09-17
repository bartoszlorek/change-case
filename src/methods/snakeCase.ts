import {lowerCase} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

// legacy
import {noCase as legacyNoCase} from './noCase';

export function snakeCase(value: string) {
  return legacyNoCase(value, '_');
}

export function snakeCaseV3(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => lowerCase(value))
    .join('_');
}
