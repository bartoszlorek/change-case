import {upperCase} from '../../helpers';
import {tokenizer, isNotEmptyToken} from '../../tokenizer';

export function constantCase(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}) => upperCase(value))
    .join('_');
}
