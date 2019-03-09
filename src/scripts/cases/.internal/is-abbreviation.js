// A.B. abbr. Acad. A.D. alt. at. no. Capt. Dr. est. Sgt. ...
// it's not a perfect solution but works in many common cases:
// - abbrv contains 3 or less characters (there are with more but...)
// - abbrv starts with capital letter
// - abbrv ends with dot (issue of parsing sentence)

const MAX_LENGTH = 3;
const LAST_WORD = /([^\s]*?)\.+$/m;

function isAbbreviation(value) {
  if (!value || value[value.length - 1] !== '.') {
    return false;
  }
  let last = value.match(LAST_WORD)[1];
  return last.length <= MAX_LENGTH || last[0] === last[0].toUpperCase();
}

export default isAbbreviation;
