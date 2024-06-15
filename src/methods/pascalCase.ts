import {createDefinition} from './types';
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
