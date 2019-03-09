function spliceString(str, value, start, end) {
  return str.slice(0, start) + value + str.slice(end);
}

export default spliceString;
