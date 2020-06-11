// @flow strict

import {upperCase} from './upperCase';

export function isUpperCase(char: string) {
  return char === upperCase(char);
}
