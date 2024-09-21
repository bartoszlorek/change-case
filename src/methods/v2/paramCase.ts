import {noCase} from './noCase';

export function paramCase(value: string) {
  return noCase(value, '-');
}
