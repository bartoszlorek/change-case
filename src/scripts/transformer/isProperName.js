// @flow strict

import {isUpperCase} from './isUpperCase';

export function isProperName(value: string) {
  let lowerCasedFirst = !isUpperCase(value[0]);
  let upperCasedChars = 0;

  for (let i = 0; i < value.length; i++) {
    if (isUpperCase(value[i])) {
      upperCasedChars += 1;
    }
    if (lowerCasedFirst && upperCasedChars > 0) {
      return true;
    }
    if (upperCasedChars > 1) {
      return true;
    }
  }

  return false;
}
