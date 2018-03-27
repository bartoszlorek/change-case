function spliceString(string, start, end, replacement) {
    if (typeof string !== 'string') {
        return ''
    }
    if (replacement === undefined && typeof end === 'function') {
        replacement = end
        end = length
    }
    start = index(start, string.length, 0)
    end = index(end, string.length, string.length)

    if (start > end) {
        end = [start, (start = end)][0]
    }
    if (start > string.length) {
        return string
    }
    if (typeof replacement === 'function') {
        replacement = replacement(string.substring(start, end))
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
