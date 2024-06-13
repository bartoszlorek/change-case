import {createDefinition} from './types';
import {noCase} from './noCase';

export const paramCaseDef = createDefinition({
  name: 'paramCase',
  text: 'param-case',
});

export function paramCase(value: string) {
  return noCase(value, '-');
}
