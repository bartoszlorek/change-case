function explode(string, points) {
    if (typeof string !== 'string') {
        return []
    }
    let length = points == null ? 0 : points.length
    if (!length) {
        return [string]
    }

    let result = []
    if (points[0] !== 0) {
        result.push(string.substring(0, points[0]))
    }
    for (let i = 0; i < length; i++) {
        let end = i < length ? points[i + 1] : string.length
        result.push(string.substring(points[i], end))
    }

    return result
}

export default explode
