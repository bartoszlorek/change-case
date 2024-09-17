import {upperCaseFirst, startsNumeric} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

// legacy
import {camelCase as legacyCamelCase} from './camelCase';
import {upperCase as legacyUpperCase} from './upperCase';

export function pascalCase(value: string, mergeNumbers?: boolean) {
  return legacyUpperCaseFirst(legacyCamelCase(value, mergeNumbers));
}

function legacyUpperCaseFirst(value: string) {
  value = String(value);
  return legacyUpperCase(value.charAt(0)) + value.substr(1);
}

export function pascalCaseV3(input: string) {
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
