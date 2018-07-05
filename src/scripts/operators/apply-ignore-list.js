import findAll from '../../.utils/find-all'
import explode from '../../.utils/explode'
import breakPoints from './.internal/break-points'

function applyIgnoreList(data) {
    if (data == null || !data.length) {
        return state => state
    }

    return state => {
        let srcMatches = findAll(state.source, data, true)
        if (srcMatches.length === 0) {
            return state
        }

        // there might be changes of whitespace
        let resMatches = findAll(state.result,
            data.map(a => state.method(a)),
            true
        )

        let resParts = explode(state.result, breakPoints(resMatches)),
            length = resMatches.length,
            indexMatch = 0,
            index = 0

        while (indexMatch < length) {
            if (resParts[index] === resMatches[indexMatch].match) {
                resParts[index] = srcMatches[indexMatch].match
                indexMatch++
            }
            index++
        }

        state.result = resParts.join('')
        return state
    }
}

export default applyIgnoreList
