/**
 * The cases are based on change-case by Blake Embrey
 * https://github.com/blakeembrey/change-case
 */

import toTitleCase from 'to-title-case'
import NON_WORD_REGEXP from './internal/non-word-regexp'
import CAMEL_CASE_REGEXP from './internal/camel-case-regexp'
import CAMEL_CASE_UPPER_REGEXP from './internal/camel-case-upper-regexp'
import removeAccents from './internal/remove-accents'
import isAbbreviation from './internal/is-abbreviation'

export default {
    upperCase,
    lowerCase,
    titleCase: toTitleCase,
    sentenceCase,

    camelCase,
    pascalCase,
    constantCase,

    paramCase,
    snakeCase,
    dotCase,

    toggleCase,
    noAccents: removeAccents,
    noCase: value => noCase(value, ' ')
}

function noCase(value, replacement) {
    value = String(value)
        .replace(CAMEL_CASE_REGEXP, '$1 $2')
        .replace(CAMEL_CASE_UPPER_REGEXP, '$1 $2')

    if (typeof replacement === 'string') {
        value = value.replace(NON_WORD_REGEXP, (match, index, value) => {
            if (index === 0 || index === value.length - match.length) {
                return ' '
            }
            return replacement
        })
    }
    return lowerCase(value)
}

function upperCase(value) {
    return value.toUpperCase()
}

function lowerCase(value) {
    return value.toLowerCase()
}

function upperCaseFirst(value) {
    value = String(value)
    return upperCase(value.charAt(0)) + value.substr(1)
}

const GROUP_SENTENCES = /(\s+|.*?[.!?])/g

function sentenceCase(value) {
    const frags = noCase(value)
        .split(GROUP_SENTENCES)
        .filter(a => a !== '')

    let prev = false
    return frags.reduce((result, frag, index) => {
        if (frag[0] !== ' ') {
            if (prev === false) {
                frag = upperCaseFirst(frag)
            }
            prev = isAbbreviation(frag)
        }
        return result + frag
    }, '')
}

function camelCase(value, mergeNumbers) {
    value = noCase(value)

    if (!mergeNumbers) {
        value = value.replace(/ (?=\d)/g, '_')
    }
    return value.replace(/ (.)/g, function(m, $1) {
        return upperCase($1)
    })
}

function pascalCase(value, mergeNumbers) {
    return upperCaseFirst(camelCase(value, mergeNumbers))
}

function constantCase(value) {
    return upperCase(snakeCase(value))
}

function paramCase(value) {
    return noCase(value, '-')
}

function snakeCase(value) {
    return noCase(value, '_')
}

function dotCase(value) {
    return noCase(value, '.')
}

function toggleCase(value) {
    let length = value.length,
        result = ''

    for (let i = 0; i < length; i++) {
        let char = value[i],
            upper = upperCase(char)
        result += char === upper ? lowerCase(char) : upper
    }
    return result
}
