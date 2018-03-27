function indicesOf(string = '', value = '') {
    let startIndex = 0,
        indices = [],
        index

    if (!string || !value) {
        return []
    }
    while ((index = string.indexOf(value, startIndex)) > -1) {
        indices.push(index)
        startIndex = index + value.length
    }
    return indices
}

export default indicesOf
