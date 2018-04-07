function parseList(value) {
    if (Array.isArray(value)) {
        return value
    }
    if (typeof value === 'string' && value.trim()) {
        return value.split(/\s*\,\s*/)
    }
    return null
}

export default parseList
