import findAllWords from '../../.utils/find-all-words';

const spliceString = (str, value, start, end) => {
  return str.slice(0, start) + value + str.slice(end);
};

function applyCorrectList(data) {
  if (data == null || !data.length) {
    return state => state;
  }

  return state => {
    const matches = findAllWords(state.result, data);

    for (const {index, match, value} of matches) {
      state.result = spliceString(
        state.result,
        value,
        index,
        index + match.length
      );
    }

    return state;
  };
}

export default applyCorrectList;
