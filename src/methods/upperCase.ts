import {createDefinition} from './types';

export const upperCaseDef = createDefinition({
  name: 'upperCase',
  text: 'UPPERCASE',
});

export function upperCase(value: string) {
  return value.toUpperCase();
}
