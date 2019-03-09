/*
  Match one or more whitespaces or punctuations symbols:

  General Punctuation          \u2000-\u206F
  Supplemental Punctuation     \u2E00-\u2E4F
  CJK Symbols and Punctuation  \u3000-\u303F
  Basic Latin                  \u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E
  Latin-1 Supplement           \u00A1-\u00BF
  Spacing Modifier Letters     \u02B0-\u02FF
  Combining Diacritical Marks  \u0300-\u0362
  Superscripts and Subscripts  \u2070-\u209F
  Mathematical Operators       \u2200-\u22FF
*/

const regex = /([\s\u2000-\u206F\u2E00-\u2E4F\u3000-\u303F\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u00A1-\u00BF\u02B0-\u02FF\u0300-\u0362\u2070-\u209F\u2200-\u22FF]+)/g;

const splitByWords = str => str.split(regex);

export default splitByWords;
