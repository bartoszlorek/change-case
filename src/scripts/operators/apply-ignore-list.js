import findAllWords from 'Utils/find-all-words';
import spliceString from 'Utils/splice-string';

function applyIgnoreList(data) {
  if (data == null || !data.length) {
    return state => state;
  }

  return state => {
    const matches = findAllWords(state.source, data);

    return {
      ...state,
      result: matches.reduce((result, {index, match}) => {
        return spliceString(result, match, index, index + match.length);
      }, state.result)
    };
  };
}

export default applyIgnoreList;
