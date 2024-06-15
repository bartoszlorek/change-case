import {createDefinition} from './types';
import {upperCase} from './upperCase';
import {snakeCase} from './snakeCase';

export const constantCaseDef = createDefinition({
  name: 'constantCase',
  text: 'CONSTANT_CASE',
});

export function constantCase(value: string) {
  return upperCase(snakeCase(value));
}
