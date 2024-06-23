import {createDefinition} from './types';
import {upperCaseFirst, startsNumeric} from '../helpers';
import {tokenizer, isNotEmptyToken} from '../tokenizer';

import {camelCase} from './camelCase';
import {upperCase} from './upperCase';

export const pascalCaseDef = createDefinition({
  name: 'pascalCase',
  text: 'PascalCase',
});

export function pascalCase(value: string, mergeNumbers?: boolean) {
  return deprecatedUpperCaseFirst(camelCase(value, mergeNumbers));
}

function deprecatedUpperCaseFirst(value: string) {
  value = String(value);
  return upperCase(value.charAt(0)) + value.substr(1);
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
