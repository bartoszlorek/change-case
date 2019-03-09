const isEqualWord = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a && b && a.toLowerCase && b.toLowerCase) {
    return a.toLowerCase() === b.toLowerCase();
  }
  return false;
};

export default isEqualWord;
