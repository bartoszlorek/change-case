// indices should be in correct order
// explode('hello world', [0, 2, 8])
// => ['he', 'llo wo', 'rld']

function explode(string, indices) {
    if (typeof string !== 'string') {
        return []
    }
    let length = indices == null ? 0 : indices.length
    if (!length) {
        return [string]
    }

    let result = []
    if (indices[0] !== 0) {
        result.push(string.substring(0, indices[0]))
    }
    for (let i = 0; i < length; i++) {
        let end = i < length ? indices[i + 1] : string.length
        result.push(string.substring(indices[i], end))
    }

    return result
}

export default explode
