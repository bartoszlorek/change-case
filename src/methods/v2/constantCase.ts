import {upperCase} from './upperCase';
import {snakeCase} from './snakeCase';

export function constantCase(value: string) {
  return upperCase(snakeCase(value));
}
