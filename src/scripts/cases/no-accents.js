import ACCENTS_MAP from './.internal/accents-map';

const chars = Object.keys(ACCENTS_MAP).join('|');
const regex = new RegExp(chars, 'g');

function noAccents(string) {
  return string.replace(regex, match => ACCENTS_MAP[match]);
}

export default noAccents;
