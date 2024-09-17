import {lowerCase, upperCaseFirst, startsNumeric} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

// legacy
import {noCase as legacyNoCase} from './noCase';
import {upperCase as legacyUpperCase} from './upperCase';

export function camelCase(value: string, mergeNumbers?: boolean) {
  value = legacyNoCase(value, ' ');

  if (!mergeNumbers) {
    value = value.replace(/ (?=\d)/g, '_');
  }

  return value.replace(/ (.)/g, function (m, $1) {
    return legacyUpperCase($1);
  });
}

export function camelCaseV3(input: string) {
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
