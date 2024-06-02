export function findAllWords(string: string, search: string[]) {
  if (!string || !search.length) {
    return [];
  }

  const stringParts = splitByWords(string);
  const matches = [];

  for (const value of search) {
    const valueParts = splitByWords(value);
    const lastValueIndex = valueParts.length - 1;

    let valueIndex = 0;
    let stringIndex = -1;

    while (++stringIndex < stringParts.length) {
      if (isEqualWord(stringParts[stringIndex], valueParts[valueIndex])) {
        if (valueIndex === lastValueIndex) {
          const index = arrayIndexToCharIndex(
            stringIndex - valueIndex,
            stringParts
          );

          matches.push({
            match: string.slice(index, index + value.length),
            value,
            index,
          });
        }

        valueIndex += 1;
      } else {
        valueIndex = 0;
      }
    }
  }

  if (matches.length) {
    matches.sort((a, b) => a.index - b.index);
  }
  return matches;
}

function arrayIndexToCharIndex<T>(arrayIndex: number, array: T[]) {
  return array.slice(0, arrayIndex).join("").length;
}

function isEqualWord(a: string, b: string) {
  if (a === b) {
    return true;
  }
  if (a && b && a.toLowerCase && b.toLowerCase) {
    return a.toLowerCase() === b.toLowerCase();
  }
  return false;
}

/*
  Match one or more whitespace characters or punctuations symbols:

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
const regex =
  /([\s\u2000-\u206F\u2E00-\u2E4F\u3000-\u303F\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u00A1-\u00BF\u02B0-\u02FF\u0300-\u0362\u2070-\u209F\u2200-\u22FF]+)/g;

function splitByWords(value: string) {
  return value.split(regex);
}
