import {createDefinition} from './types';
import {noCase} from './noCase';

export const snakeCaseDef = createDefinition({
  name: 'snakeCase',
  text: 'snake_case',
});

export function snakeCase(value: string) {
  return noCase(value, '_');
}
