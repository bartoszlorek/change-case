import {createDefinition} from './types';
import {tokenizer, notEmptyToken, startsNumeric} from '../helpers/tokenizer';
import {lowerCaseV3} from './lowerCase';
import {upperCaseV3} from './upperCase';

import {noCase} from './noCase';
import {upperCase} from './upperCase';

export const camelCaseDef = createDefinition({
  name: 'camelCase',
  text: 'camelCase',
});

export function camelCase(value: string, mergeNumbers?: boolean) {
  value = noCase(value, ' ');

  if (!mergeNumbers) {
    value = value.replace(/ (?=\d)/g, '_');
  }

  return value.replace(/ (.)/g, function (m, $1) {
    return upperCase($1);
  });
}

export function camelCaseV3(input: string) {
  return tokenizer(input)
    .filter(notEmptyToken)
    .map<string>(({value}, index) => {
      if (index === 0) {
        return lowerCaseV3(value);
      }

      if (startsNumeric(value)) {
        return '_' + value;
      }

      return upperCaseV3(value.slice(0, 1)) + lowerCaseV3(value.slice(1));
    })
    .join('');
}
