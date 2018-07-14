import camelCase from './camel-case'
import upperCaseFirst from './.internal/upper-case-first'

function pascalCase(string, mergeNumbers) {
    return upperCaseFirst(camelCase(string, mergeNumbers))
}

export default pascalCase
