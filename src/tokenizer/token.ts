import {lowerCase} from '../helpers';
import {openingMarksList, closingMarksMap} from './quotations';
import {
  threeOrMoreLetterAbbreviations,
  popularTwoLetterWords,
} from './abbreviations';

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

  isOpeningQuotation() {
    return this.value === '' && openingMarksList.includes(this.extra);
  }

  isClosingQuotation(openingMark: string) {
    const closingMarks = closingMarksMap.get(openingMark);
    return closingMarks?.includes(this.extra) || false;
  }

  isAbbreviation() {
    if (this.extra !== '.') {
      return false;
    }
    const lowerValue = lowerCase(this.value);
    if (lowerValue.length >= 3) {
      return threeOrMoreLetterAbbreviations.includes(lowerValue);
    }
    // v. e.g. i.e. Dr. Mr. St.
    return !popularTwoLetterWords.includes(lowerValue);
  }
}
