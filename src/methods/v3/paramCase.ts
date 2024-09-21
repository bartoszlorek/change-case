import {lowerCase} from '../../helpers';
import {tokenizer, isNotEmptyToken} from '../../tokenizer';

export function paramCase(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => lowerCase(value))
    .join('-');
}
