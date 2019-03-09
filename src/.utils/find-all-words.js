import isEqualWord from './is-equal-word';
import splitByWords from './split-by-words';

const arrayIndexToCharIndex = (arrayIndex, array) => {
  return array.slice(0, arrayIndex).join('').length;
};

function findAllWords(string = '', search = '') {
  if (!string || !search) {
    return [];
  }
  if (typeof search === 'string') {
    search = [search];
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
            index
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

export default findAllWords;
