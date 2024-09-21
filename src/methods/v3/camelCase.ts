import {lowerCase, upperCaseFirst, startsNumeric} from '../../helpers';
import {tokenizer, isNotEmptyToken} from '../../tokenizer';

export function camelCase(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map(({value}, index) => {
      if (index === 0) {
        return lowerCase(value);
      }

      if (startsNumeric(value)) {
        return '_' + value;
      }

      return upperCaseFirst(value);
    })
    .join('');
}
