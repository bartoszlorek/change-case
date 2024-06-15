import {createDefinition} from './types';
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
