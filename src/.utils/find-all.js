import indicesOf from './indices-of'

function findAll(string = '', search = '', insensitive = false) {
    if (!string || !search) {
        return []
    }
    if (typeof search === 'string') {
        search = [search]
    }
    let searchIndex = -1
    const searchLength = search ? search.length : 0

    if (!searchLength) {
        return []
    }

    let bufferString = insensitive ? string.toLowerCase() : string,
        result = []

    while (++searchIndex < searchLength) {
        let indicesIndex = -1,
            value = search[searchIndex],
            bufferValue = insensitive ? value.toLowerCase() : value

        const indices = indicesOf(bufferString, bufferValue)
        const indicesLength = indices.length

        while (++indicesIndex < indicesLength) {
            let index = indices[indicesIndex]

            result.push({
                match: string.slice(index, index + value.length),
                value,
                index
            })
        }
    }

    if (result.length) {
        result.sort((a, b) => a.index - b.index)
    }
    return result
}

export default findAll
