function indicesOf(string = '', value = '') {
  let offset = 0,
    result = [],
    index;

  if (!string || !value) {
    return [];
  }
  while ((index = string.indexOf(value, offset)) > -1) {
    offset = index + value.length;
    result.push(index);
  }
  return result;
}

export default indicesOf;
