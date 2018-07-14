import toTitleCase from 'to-title-case'
import upperCaseFirst from './.internal/upper-case-first'

const HYPHENATED_WORDS = /[^\s]+-[^\s]+/g

function titleCase(string) {
    return toTitleCase(string).replace(HYPHENATED_WORDS, match => (
        match.split('-').map(upperCaseFirst).join('-')
    ))
}

export default titleCase
