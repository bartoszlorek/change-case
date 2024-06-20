/**
 * https://en.wikipedia.org/wiki/Latin-1_Supplement
 */
const latinSupplement =
  /\u00C0-\u00CF\u00D0-\u00D6\u00D8-\u00DF\u00E0-\u00EF\u00F0-\u00F6\u00F8-\u00FF/;

/**
 * https://en.wikipedia.org/wiki/Latin_Extended-A
 */
const latinExtendedA =
  /\u0100-\u010F\u0110-\u011F\u0120-\u012F\u0130-\u013F\u0140-\u014F\u0150-\u015F\u0160-\u016F\u0170-\u017F/;

/**
 * https://en.wikipedia.org/wiki/Latin_Extended-B
 */
const latinExtendedB =
  /\u0180-\u018F\u0190-\u019F\u01A0-\u01AF\u01B0-\u01BF\u01C0-\u01CF\u01D0-\u01DF\u01E0-\u01EF\u01F0-\u01FF\u0200-\u020F\u0210-\u021F\u0220-\u022F\u0230-\u023F\u0240-\u024F/;

/**
 * https://en.wikipedia.org/wiki/Latin_Extended_Additional
 */
const latinExtendedAdditional =
  /\u1E00-\u1E0F\u1E10-\u1E1F\u1E20-\u1E2F\u1E30-\u1E3F\u1E40-\u1E4F\u1E50-\u1E5F\u1E60-\u1E6F\u1E70-\u1E7F\u1E80-\u1E8F\u1E90-\u1E9F\u1EA0-\u1EAF\u1EB0-\u1EBF\u1EC0-\u1ECF\u1ED0-\u1EDF\u1EE0-\u1EEF\u1EF0-\u1EFF/;

/**
 * https://en.wikipedia.org/wiki/Latin_Extended-C
 */
const latinExtendedC = /\u2C60-\u2C6F\u2C70-\u2C7F/;

/**
 * https://en.wikipedia.org/wiki/Greek_and_Coptic
 */
const greekAndCoptic =
  /\u0370-\u0373\u0376\u0377\u037B-\u037D\u037F\u0386\u0388-\u038F\u0390-\u039F\u03A0-\u03AF\u03B0-\u03BF\u03C0-\u03CF\u03D0-\u03DF\u03E0-\u03EF\u03F0-\u03FF/;

/**
 * https://en.wikipedia.org/wiki/Greek_Extended
 */
const greekExtended =
  /\u1F00-\u1F0F\u1F10-\u1F1F\u1F20-\u1F2F\u1F30-\u1F3F\u1F40-\u1F4F\u1F50-\u1F5F\u1F60-\u1F6F\u1F70-\u1F7F\u1F80-\u1F8F\u1F90-\u1F9F\u1FA0-\u1FAF\u1FB0-\u1FBC\u1FC0-\u1FCC\u1FD0-\u1FDC\u1FE0-\u1FEC\u1FF0-\u1FFC/;

/**
 * https://en.wikipedia.org/wiki/Cyrillic_(Unicode_block)
 */
const cyrillic =
  /\u0400-\u040F\u0410-\u041F\u0420-\u042F\u0430-\u043F\u0440-\u044F\u0450-\u045F\u0460-\u046F\u0470-\u047F\u0480-\u048F\u0490-\u049F\u04A0-\u04AF\u04B0-\u04BF\u04C0-\u04CF\u04D0-\u04DF\u04E0-\u04EF\u04F0-\u04FF/;

/**
 * https://en.wikipedia.org/wiki/Cyrillic_Supplement
 */
const cyrillicSupplement = /\u0500-\u050F\u0510-\u051F\u0520-\u052F/;

/**
 * https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
 */
const combiningDiacriticalMarks =
  /\u0300-\u030F\u0310-\u031F\u0320-\u032F\u0330-\u033F\u0340-\u034F\u0350-\u035F\u0360-\u036F/;

/**
 * https://en.wikipedia.org/wiki/List_of_Unicode_characters
 */
const unicodeRanges = [
  latinSupplement,
  latinExtendedA,
  latinExtendedB,
  latinExtendedAdditional,
  latinExtendedC,
  greekAndCoptic,
  greekExtended,
  cyrillic,
  cyrillicSupplement,
  combiningDiacriticalMarks,
].reduce((acc, regex) => acc + regex.source, '');

const relevantCharacters = new RegExp(`[0-9a-zA-Z${unicodeRanges}]`);

interface Token {
  index: number;
  value: string;
  break: string;
}

export function tokenizer(value: string): Token[] {
  const chars = [...value];
  const tokens: Token[] = [];

  if (chars.length === 0) {
    return tokens;
  }

  let index = 0;
  let current = '';

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (!relevantCharacters.test(char)) {
      tokens.push({
        index: index,
        value: current,
        break: char,
      });

      index = i + 1;
      current = '';
    } else {
      current += char;
    }
  }

  if (current) {
    tokens.push({
      index: index,
      value: current,
      break: '',
    });
  }

  return tokens;
}

export function notEmptyToken(token: Token) {
  return token.value !== '';
}

export function startsNumeric(value: string) {
  return /^[0-9]/.test(value);
}

/**
 * https://en.wikipedia.org/wiki/Apostrophe
 */
export function isApostrophe(value: string) {
  return /['’]/.test(value);
}

/**
 * https://en.wikipedia.org/wiki/Abbreviation
 * https://www.grammar-monster.com/lessons/abbreviations_full_stops_periods.htm
 * https://www.scribbr.com/definitions/for-example-abbreviation/
 * https://edu.gcfglobal.org/en/grammar/abbreviations-and-acronyms/1/#
 */
export function isAbbreviationToken(token: Token) {
  return false;
}
