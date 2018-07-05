import findAll from '../../.utils/find-all'

const spliceString = (str, value, start, end) => {
    return str.slice(0, start) + value + str.slice(end)
}

function applyCorrectList(data) {
    if (data == null || !data.length) {
        return state => state
    }

    return state => {
        let matches = findAll(state.result, data, true)
        if (matches.length === 0) {
            return state
        }

        let matchesIndex = -1
        const matchesLength = matches.length

        // doesn't handle changes of whitespace
        while (++matchesIndex < matchesLength) {
            let { index, match, value } = matches[matchesIndex]

            state.result = spliceString(
                state.result,
                value,
                index,
                index + match.length
            )
        }

        return state
    }
}

export default applyCorrectList
