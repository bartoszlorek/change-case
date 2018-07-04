import findAll from '../../.utils/find-all'
import explode from '../../.utils/explode'
import breakPoints from '../break-points'

function applyIgnoreList(method, data) {
    return value => {
        let nextValue = method(value)
        if (!(data && data.length)) {
            return nextValue
        }

        let currMatch = findAll(value, data, true)
        if (currMatch.length === 0) {
            return nextValue
        }

        // there might be changes of whitespace
        let nextMatch = findAll(nextValue, data.map(a => method(a)), true),
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
}

export default applyIgnoreList
