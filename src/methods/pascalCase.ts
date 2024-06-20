import {createDefinition} from './types';
import {tokenizer, notEmptyToken, startsNumeric} from '../helpers/tokenizer';
import {lowerCaseV3} from './lowerCase';
import {upperCaseV3} from './upperCase';

import {camelCase} from './camelCase';
import {upperCase} from './upperCase';

export const pascalCaseDef = createDefinition({
  name: 'pascalCase',
  text: 'PascalCase',
});

export function pascalCase(value: string, mergeNumbers?: boolean) {
  return upperCaseFirst(camelCase(value, mergeNumbers));
}

function upperCaseFirst(value: string) {
  value = String(value);
  return upperCase(value.charAt(0)) + value.substr(1);
}

export function pascalCaseV3(input: string) {
  return tokenizer(input)
    .filter(notEmptyToken)
    .map<string>(({value}, index) => {
      if (index > 0 && startsNumeric(value)) {
        return '_' + value;
      }

      return upperCaseV3(value.slice(0, 1)) + lowerCaseV3(value.slice(1));
    })
    .join('');
}
