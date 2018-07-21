import escape from 'escape-regexp-component'
import noCase from './no-case'
import lowerCase from './lower-case'
import upperCase from './upper-case'
import upperCaseFirst from './.internal/upper-case-first'

import MINOR_WORDS from './.internal/minor-words'

const FIRST_LETTER_REGEX = /^.|\b./gu
const COLON_REGEX = /:\s*(\w)/g
const HYPHENATED_WORDS = /[^\s]+-[^\s]+/g
const MINOR_REGEX = new RegExp(
    '\\b(' + MINOR_WORDS.map(escape).join('|') + ')\\b',
    'igu'
)

function titleCase(string) {
    return noCase(string)
        .replace(FIRST_LETTER_REGEX, upperCase)
        .replace(MINOR_REGEX, lowerCase)
        .replace(COLON_REGEX, upperCase)
        .replace(HYPHENATED_WORDS, match => (
            match.split('-').map(upperCaseFirst).join('-')
        ))
}

export default titleCase
