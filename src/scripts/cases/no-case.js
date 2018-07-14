import CAMEL_CASE_REGEXP from './.internal/camel-case-regexp'
import CAMEL_CASE_UPPER_REGEXP from './.internal/camel-case-upper-regexp'
import NON_WORD_REGEXP from './.internal/non-word-regexp'

import lowerCase from './lower-case'

function noCase(string, replacement) {
    string = String(string)
        .replace(CAMEL_CASE_REGEXP, '$1 $2')
        .replace(CAMEL_CASE_UPPER_REGEXP, '$1 $2')

    if (typeof replacement === 'string') {
        string = string.replace(NON_WORD_REGEXP, (match, index, value) => {
            if (index === 0 || index === value.length - match.length) {
                return ''
            }
            return replacement
        })
    }

    return lowerCase(string)
}

export default noCase
