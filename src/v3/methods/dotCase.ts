import {createDefinition} from './types';
import {noCase} from './noCase';

export const dotCaseDef = createDefinition({
  name: 'dotCase',
  text: 'dot.case',
});

export function dotCase(value: string) {
  return noCase(value, '.');
}
