const uniqArray = (a, i, arr) => a !== arr[i - 1];

function getBreakPoints(matches) {
  let points = matches.map(({ match, index }) => [index, index + match.length]);
  return [].concat(...points).filter(uniqArray);
}

export default getBreakPoints;
