// @flow strict

import {type Token} from '../types';

export function createToken(value: string): Token {
  return {
    value,
    type: 'unassigned',
  };
}
