import findAllWords from '../../.utils/find-all-words';
import getBreakPoints from './.internal/break-points';
import explode from '../../.utils/explode';

function applyIgnoreList(data) {
  if (data == null || !data.length) {
    return state => state;
  }

  return state => {
    const sourceMatches = findAllWords(state.source, data);

    if (!sourceMatches.length) {
      return state;
    }

    // It checks that matches from source and result because
    // there might be changes in whitespace characters.
    const transformedData = data.map(a => state.method(a));
    const resultMatches = findAllWords(state.result, transformedData);
    const resultParts = explode(state.result, getBreakPoints(resultMatches));

    let indexMatch = 0;
    let indexParts = 0;

    while (indexMatch < resultMatches.length) {
      if (resultParts[indexParts] === resultMatches[indexMatch].match) {
        resultParts[indexParts] = sourceMatches[indexMatch].match;
        indexMatch += 1;
      }
      indexParts += 1;
    }

    state.result = resultParts.join('');
    return state;
  };
}

export default applyIgnoreList;
