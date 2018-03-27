function spliceString(string, start, end, replacement) {
    if (typeof string !== 'string') {
        return ''
    }
    let length = string.length

    if (replacement === undefined && typeof end === 'function') {
        replacement = end
        end = length
    }
    start = index(start, length, 0)
    end = index(end, length, length)

    if (start > end) {
        end = [start, (start = end)][0]
    }
    if (start > length) {
        return string
    }

    if (typeof replacement === 'function') {
        replacement = replacement(string
            .substring(start, end))
    }
    return (
        string.substring(0, start)
        + (replacement || '')
        + string.substring(end)
    )
}

function index(value, length, fallback) {
    if (value == null) {
        return fallback
    }
    if (value < 0) {
        value = -value > length ? 0 : length + value
    }
    return value
}

export default spliceString
