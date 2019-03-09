import findAllWords from '../../.utils/find-all-words';
import spliceString from '../../.utils/splice-string';

function applyCorrectList(data) {
  if (data == null || !data.length) {
    return state => state;
  }

  return state => {
    const matches = findAllWords(state.result, data);

    return {
      ...state,
      result: matches.reduce((result, {index, match, value}) => {
        return spliceString(result, value, index, index + match.length);
      }, state.result)
    };
  };
}

export default applyCorrectList;
