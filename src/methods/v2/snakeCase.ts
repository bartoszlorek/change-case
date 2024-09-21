import {noCase} from './noCase';

export function snakeCase(value: string) {
  return noCase(value, '_');
}
