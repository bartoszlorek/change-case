import {createDefinition} from './types';

export const lowerCaseDef = createDefinition({
  name: 'lowerCase',
  text: 'lowercase',
});

export function lowerCase(value: string) {
  return value.toLowerCase();
}

export function lowerCaseV3(input: string) {
  return input.toLocaleLowerCase();
}
