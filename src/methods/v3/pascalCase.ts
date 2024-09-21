import {upperCaseFirst, startsNumeric} from '../../helpers';
import {tokenizer, isNotEmptyToken} from '../../tokenizer';

export function pascalCase(input: string) {
  return tokenizer(input)
    .filter(isNotEmptyToken)
    .map<string>(({value}, index) => {
      if (index > 0 && startsNumeric(value)) {
        return '_' + value;
      }

      return upperCaseFirst(value);
    })
    .join('');
}
