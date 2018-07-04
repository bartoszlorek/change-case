import findAll from '../../.utils/find-all'

const spliceString = (str, value, start, end) => {
    return str.slice(0, start) + value + str.slice(end)
}

function applyCorrectList(method, data) {
    return string => {
        if (!(data && data.length)) {
            return string
        }

        let matches = findAll(string, data, true)
        if (matches.length === 0) {
            return string
        }

        let matchesIndex = -1
        const matchesLength = matches.length

        // doesn't handle changes of whitespace
        while (++matchesIndex < matchesLength) {
            let { index, match, value } = matches[matchesIndex]
            string = spliceString(string, value, index, index + match.length)
        }

        return string
    }
}

export default applyCorrectList
