import findAll from '../.utils/find-all'
import explode from '../.utils/explode'

const uniqArray = (a, i, arr) => a !== arr[i - 1]

const breakPoints = matches => {
    let points = matches.map(({ match, index }) => [
        index, index + match.length
    ])
    return [].concat(...points).filter(uniqArray)
}

function applyBlacklist(method, value, list) {
    let nextValue = method(value)
    if (list == null) {
        return nextValue
    }
    let currMatch = findAll(value, list, true)
    if (currMatch.length === 0) {
        return nextValue
    }

    // there might be changes of whitespace
    let nextMatch = findAll(nextValue, list.map(a => method(a)), true),
        nextParts = explode(nextValue, breakPoints(nextMatch)),
        length = nextMatch.length,
        indexMatch = 0,
        index = 0

    while (indexMatch < length) {
        if (nextParts[index] === nextMatch[indexMatch].match) {
            nextParts[index] = currMatch[indexMatch].match
            indexMatch++
        }
        index++
    }

    return nextParts.join('')
}

export default applyBlacklist
