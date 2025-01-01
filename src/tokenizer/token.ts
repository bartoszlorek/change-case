import {lowerCase} from '../helpers';

export class Token {
  index: number;
  value: string;
  extra: string;

  constructor(index: number, value: string, extra: string) {
    this.index = index;
    this.value = value;
    this.extra = extra;
  }

  toText() {
    return this.value + this.extra;
  }

  isEmpty() {
    return this.value === '';
  }

  isNotEmpty() {
    return this.value !== '';
  }

  isEqual(token: Token) {
    return this.value === token.value;
  }

  isFuzzyEqual(token: Token) {
    return lowerCase(this.value) === lowerCase(token.value);
  }
}
